'use strict';

angular
  .module('ghexplorer.home')
  .controller('ghexplorer.home.controller.index', function ($scope, $http) {
    $scope.popular = [];
    $scope.repo = {
      author: 'Microsoft',
      name: 'TypeScript'
    };

    $http.get('/stats').then(function(response) {
      $scope.popular = response.data;
    });
  });
