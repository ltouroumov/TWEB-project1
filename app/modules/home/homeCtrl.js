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

  function Graph($scope, $http) {

    $scope.update = function update() {

      $http.get('https://api.github.com/repos/' + $scope.reponame + "/commits").then(function(response) {
        var stats = {};

        response.data.forEach(function(el) {
          if (!stats[el.author.login]) {
            stats[el.author.login] = 0;
          }

          stats[el.author.login]++;
        });

        var labels = [];
        var data = [];

        Object.keys(stats).forEach(function(author) {
          labels.push(author);
          data.push(stats[author]);
        });
        $scope.labels = labels;
        $scope.data = data;
      });
    };

    $scope.labels = [];
    $scope.data = [];

  }

})();
