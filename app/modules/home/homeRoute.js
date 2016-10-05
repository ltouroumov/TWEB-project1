'use strict';

/**
 * @ngdoc function
 * @name app.route:HomeRoute
 * @description
 * # HomeRoute
 * Route of the app
 */

angular.module('tweb-ghexplorer')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('root.home', {
        url: '/',
        views: {
          'content@': {
            templateUrl: 'app/modules/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('root.graph', {
        url: '/stats',
        views: {
          'content@': {
            templateUrl: 'app/modules/home/graph.html',
            controller: 'GraphCtrl'
          }
        }
      });

  }]);