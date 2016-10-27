"use strict";

var gulp = require("gulp");
var liveServer = require("gulp-live-server");
var less = require("gulp-less");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var sourcemaps = require("gulp-sourcemaps");
var browserify = require("browserify");
var ngAnnotate = require('browserify-ngannotate');
var purify = require("gulp-purifycss");
var stripCssComments = require("gulp-strip-css-comments");
var htmlmin = require("gulp-htmlmin");
var ngHtml2Js = require("gulp-ng-html2js");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var clean = require("gulp-clean");
var util = require("gulp-util");
var size = require("gulp-size");
var CacheBuster = require("gulp-cachebust");

var cachebust = new CacheBuster();

var production = (process.env.NODE_ENV === "production");

var libs = [
  "angular",
  "angular-animate",
  "angular-resource",
  "angular-ui-router",
  "angular-chart.js"
];

gulp.task("css", function () {
  var stream = gulp.src("app/style.less").pipe(less());

  if (production) {
    util.log("Purifying css");
    stream = stream.pipe(purify(["./app/**/*.html"], {minify: true}))
      .pipe(stripCssComments({preserve: false}));
  }

  return stream
    .pipe(cachebust.resources())
    .pipe(size({showFiles: true, showTotal: false}))
    .pipe(gulp.dest("public/assets/"))
});


gulp.task("vendor", function () {
  var b = browserify({entries: "app/vendor.js", debug: false});
  libs.forEach(function (lib) {
    b.require(lib);
  });

  var stream = b
    .bundle()
    .pipe(source("vendors.js"));

  if (production) {
    util.log("Uglifying vendors");
    stream = stream.pipe(buffer()).pipe(uglify());
  }

  return stream
    .pipe(cachebust.resources())
    .pipe(gulp.dest("public/assets/"))
    // this must be after : why ??
    .pipe(size({showFiles: true, showTotal: false}));
});


gulp.task('templates', function () {
  var stream = gulp.src("app/*/**/*.html");

  if (production) {
    util.log("Minifying templates");
    stream = stream.pipe(htmlmin({removeComments: true}));
  }

  stream = stream
    .pipe(ngHtml2Js({
      moduleName: "ghexplorer.templates",
      prefix: ""
    }))
    .pipe(concat("templates.js"));

  if (production) {
    util.log("Uglifying templates");
    stream = stream.pipe(uglify());
  }

  return stream
    .pipe(size({showFiles: true, showTotal: false}))
    .pipe(gulp.dest("public/assets/"));
});


gulp.task("app", ["templates"], function () {
  var b = browserify({
    entries: ["app/app.js", "public/assets/templates.js"],
    debug: !production,
    read: false,
    transform: [ngAnnotate]
  });
  libs.forEach(function (lib) {
    b.external(lib)
  });

  var stream = b
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}));

  if (production) {
    util.log("Uglifying app");
    stream.pipe(uglify());
  }

  return stream
    .pipe(sourcemaps.write("./"))
    .pipe(cachebust.resources())
    .pipe(size({showFiles: true, showTotal: false}))
    .pipe(gulp.dest("public/assets/"));
});


gulp.task("build", ["css", "vendor", "app"], function () {
  return gulp
    .src("app/index.html")
    .pipe(cachebust.references())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(size({showFiles: true, showTotal: false}))
    .pipe(gulp.dest("public/"))
});


gulp.task("watch", ["build"], function () {
  var server = liveServer.new("express/index.js");
  server.start();

  gulp.watch(["express/**/*.js"], function () {
    util.log("Restarting server");
    server.start();
  });

  gulp.watch(["app/*.js", "app/**/*.js", "app/**/*.html", "app/**/*.less"], ["build"]);

  gulp.watch(["public/*"], function (event) {
    server.notify([event.path])
  });
});
