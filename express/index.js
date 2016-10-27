var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require("assert");
var _ = require("lodash");

var app = express();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ghexplorer";

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public/'));
app.use(bodyParser.json());

app.get('/stats', function (req, res) {

  MongoClient.connect(MONGODB_URI)
    .catch(function (err) {
      console.log("Error opening database connection", err);
    })
    .then(function (db) {
      console.log("Connected to", MONGODB_URI);
      var coll = db.collection("stats");

      coll.find().sort({count: -1}).limit(5).toArray().then(function (items) {
        console.log("Found stats", items.length);
        res.json(_.map(items, function (item) {
          return _.omit(item, '_id');
        }));

        db.close();
      });
    });

});

app.post('/stats', function (req, resp) {

  var info = req.body;

  console.log("Updating stats", info);

  MongoClient.connect(MONGODB_URI)
    .catch(function (err) {
      console.log("Error opening database connection", err);
    })
    .then(function (db) {
      console.log("Connected");

      var coll = db.collection("stats");

      coll.findOne(info)
        .then(function (item) {
          console.log("Item", item);

          if (item === null) {
            var data = _.assign(info, {count: 1});
            return coll.insertOne(info).then(_.constant(data));
          } else {
            var data = _.update(item, 'count', function (n) {
              return n + 1;
            });
            return coll.updateOne({_id: item._id}, data).then(_.constant(data));
          }
        })
        .then(function (item) {
          resp.json(_.omit(item, '_id'));
        })
        .then(function () {
          console.log("Closing ...");
          db.close();
          console.log("Closed!");
        });
    });

});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
