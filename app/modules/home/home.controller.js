'use strict';

/**
 * @ngdoc function
 * @name app.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the app
 */

angular
  .module('ghexplorer.home')
  .controller('ghexplorer.home.controller.index', IndexController);

/*
 * recommend
 * Using function declarations
 * and bindable members up top.
 */

function IndexController($scope) {
  $scope.title = "Hello, ghexplorer!";
  $scope.version = "1.0.0";
}


