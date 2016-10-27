
angular
  .module('ghexplorer.stats')
  .directive("statsForm", function() {
    return {
      templateUrl: 'modules/stats/_form.html',
      controller: function ($scope, $state) {
        $scope.update = function update() {
          $state.go('stats.show', $scope.repo);
        };
      },
      scope: {
        repo: '=repo'
      }
    }
  });