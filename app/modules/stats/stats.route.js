'use strict';

angular.module('ghexplorer.stats')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('stats', {
        views: {
          'menu': {
            templateUrl: 'modules/menu/menu.html',
            controller: 'ghexplorer.menu.controller',
            params: { 'selected': 'stats' }
          }
        }
      })
      .state('stats.index', {
        url: '/stats',
        views: {
          'content@': {
            templateUrl: 'modules/stats/index.html',
            controller: 'ghexplorer.stats.controller.index'
          }
        }
      })
      .state('stats.show', {
        url: '/stats/:author/:name',
        views: {
          'content@': {
            templateUrl: 'modules/stats/show.html',
            controller: 'ghexplorer.stats.controller.show'
          }
        }
      });
  }]);