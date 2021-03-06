'use strict';

require("angular-chart.js");

/**
 * @ngdoc function
 * @name app.module:homeModule
 * @description
 * # homeModule
 * Module of the app
 */

angular.module('ghexplorer.home', [
  'chart.js',
  'ghexplorer.stats'
]);

require("./home.controller");
require("./home.route");