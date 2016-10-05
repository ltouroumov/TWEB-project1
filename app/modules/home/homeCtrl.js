(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name app.controller:HomeCtrl
   * @description
   * # HomeCtrl
   * Controller of the app
   */

  angular
    .module('tweb-ghexplorer')
    .controller('HomeCtrl', Home)
    .controller('GraphCtrl', Graph);

  /*
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  function Home($scope, homeService) {
    $scope.title = "Hello, tweb-ghexplorer!";
    $scope.version = "1.0.0";
    $scope.listFeatures = homeService.getFeaturesList();
  }

  function Graph($scope) {
    $scope.labels = ["Foo", "Bar", "Baz"];
    $scope.data = [10, 20, 30];
  }

})();
