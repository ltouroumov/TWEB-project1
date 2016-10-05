(function() {
  'use strict';

  /**
   * @ngdoc index
   * @name app
   * @description
   * # app
   *
   * Main module of the application.
   */

  angular.module('tweb-ghexplorer', [
    'ngResource',
    'ui.router',
    'home',
    'menu'
  ]);

})();
