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
        res.json(items);

        db.close();
      });
    });

});

app.post('/stats', function (req, res) {

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
            item = _.assign(info, {count: 1});
            console.log("Inserting one", item);
            return coll.insertOne(item)
              .then(function (res) {
                console.log("Inserted one");
                res.json(item);
                console.log("Sent response");
              });
          } else {
            item.count++;
            console.log("Updating one", item);
            return coll.updateOne({_id: item._id}, item)
              .then(function (res) {
                console.log("Updated one");
                res.json(item);
                console.log("Sent response");
              });
          }
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
