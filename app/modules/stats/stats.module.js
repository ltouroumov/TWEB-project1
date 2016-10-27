'use strict';

require("angular-chart.js");

/**
 * @ngdoc function
 * @name app.module:homeModule
 * @description
 * # homeModule
 * Module of the app
 */

angular.module('ghexplorer.stats', [
  'chart.js'
]);

require("./stats.controller");
require("./stats.route");