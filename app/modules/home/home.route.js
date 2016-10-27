'use strict';

/**
 * @ngdoc function
 * @name app.route:HomeRoute
 * @description
 * # HomeRoute
 * Route of the app
 */

angular.module('ghexplorer.home')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('home', {
        views: {
          'menu': {
            templateUrl: 'modules/menu/menu.html',
            controller: 'ghexplorer.menu.controller',
            params: { 'selected': 'home' }
          }
        }
      })
      .state('home.index', {
        url: '/',
        views: {
          'content@': {
            templateUrl: 'modules/home/index.html',
            controller: 'ghexplorer.home.controller.index'
          }
        }
      });

  }]);