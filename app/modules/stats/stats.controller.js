var _ = require("lodash");

angular
  .module('ghexplorer.stats')
  .controller('ghexplorer.stats.controller.index', function ($scope, $state) {
    $scope.update = function update() {
      console.log("Showing stats for", $scope.repo);
      $state.go('stats.show', $scope.repo);
    };

    $scope.repo = {
      'author': 'angular',
      'name': 'angular'
    };
  })
  .controller('ghexplorer.stats.controller.show', function ($stateParams, $scope, $state, $http) {

    $scope.reponame = $stateParams.author + "/" + $stateParams.name;

    $scope.commits = {
      labels: [],
      data: []
    };
    $scope.ad = {
      labels: [],
      series: [],
      data: []
    };
    $scope.punchcard = {
      labels: [],
      data: []
    };

    $http.get('https://api.github.com/repos/' + $scope.reponame + "/stats/contributors?per_page=100").then(function (response) {

      var series = ['Added', 'Deleted'];

      var stats = _(response.data)
        .map(function (el) {
          return {
            author: el.author.login,
            data: {
              Commits: el.total,
              Added: _.sumBy(el.weeks, 'a'),
              Deleted: _.sumBy(el.weeks, 'd')
            }
          };
        })
        .sortBy('data.Commits')
        .reverse()
        .take(10)
        .value();

      $scope.ad.labels = _.map(stats, 'author');
      $scope.ad.series = series;
      $scope.ad.data = _.map(series, function (serie) {
        return _.map(stats, 'data.' + serie)
      });
      $scope.commits.labels = _.map(stats, 'author');
      $scope.commits.data = _.map(stats, 'data.Commits');
    });

    $http.get('https://api.github.com/repos/' + $scope.reponame + "/stats/punch_card").then(function (response) {

      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var data = [0, 0, 0, 0, 0, 0, 0];

      _.each(response.data, function(point) {
        var day = point[0];
        data[day] += point[2];
      });

      $scope.punchcard.labels = days;
      $scope.punchcard.data = data;
    });
  });

