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
    .controller('MenuCtrl', Menu);

  function Menu($scope) {
    $scope.menus = {
      'Home': 'home',
      'Graph': 'graph'
    };
  }

})();
