'use strict';

/**
 * @ngdoc function
 * @name app.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the app
 */

angular
  .module('ghexplorer.menu')
  .controller('ghexplorer.menu.controller', Menu);

function Menu($scope) {
  $scope.menus = {
    'Home': 'home.index',
    'Stats': 'stats.index'
  };
}