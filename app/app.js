'use strict';

require("angular-ui-router");
require("angular-resource");
require("angular-animate");

require("./modules/menu/menu.module");
require("./modules/home/home.module");
require("./modules/stats/stats.module");

/**
 * @ngdoc index
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */

var ghexplorer = angular.module('ghexplorer', [
  'ui.router',
  'ghexplorer.templates',
  'ghexplorer.home',
  'ghexplorer.stats',
  'ghexplorer.menu'
]);

ghexplorer
  .config(function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $locationProvider.hashPrefix('!');

    // This is required for Browser Sync to work poperly
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.common['Authorization'] = 'Basic bHRvdXJvdW1vdjphOGNiY2RlOTIzMTAwMWE1NjMyM2Q4YTg1NWU0NTM3OWE5ZTRiYThi'; // jshint ignore:line

    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/');

  })
  .run(function ($rootScope) {
    console.log("Angular started");
  });
