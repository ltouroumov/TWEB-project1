/*!
* tweb-ghexplorer - v0.2.5 - MIT LICENSE 2016-10-05. 
* @author 
*/
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

(function () {
  'use strict';

  /**
   * @ngdoc configuration file
   * @name app.config:config
   * @description
   * # Config and run block
   * Configutation of the app
   */


  angular
    .module('tweb-ghexplorer')
    .config(configure)
    .run(runBlock);

  configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

  function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $locationProvider.hashPrefix('!');

    // This is required for Browser Sync to work poperly
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    $stateProvider.state('root', {
      views: {
        'menu': {
          templateUrl: 'app/modules/menu/menu.html',
          controller: 'MenuCtrl'
        }
      }
    });

    $urlRouterProvider.when('', '/');

    $urlRouterProvider.otherwise('/');

  }

  runBlock.$inject = ['$rootScope'];

  function runBlock($rootScope) {
    'use strict';

    console.log('AngularJS run() function...');
  }


})();
(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.module:homeModule
   * @description
   * # homeModule
   * Module of the app
   */

  angular.module('home', [
    'chart.js'
  ]);
})();
(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.module:homeModule
   * @description
   * # homeModule
   * Module of the app
   */

  angular.module('menu', []);
})();
'use strict';

/**
 * @ngdoc function
 * @name app.route:HomeRoute
 * @description
 * # HomeRoute
 * Route of the app
 */

angular.module('tweb-ghexplorer')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('root.home', {
        url: '/',
        views: {
          'content@': {
            templateUrl: 'app/modules/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('root.graph', {
        url: '/stats',
        views: {
          'content@': {
            templateUrl: 'app/modules/home/graph.html',
            controller: 'GraphCtrl'
          }
        }
      });

  }]);
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

(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name app.service:homeService
   * @description
   * # homeService
   * Service of the app
   */

  angular.module('tweb-ghexplorer')
    .factory('homeService', homeService);

  homeService.$inject = ['$http'];

  function homeService($http) {

    var list = [
      {"feature": "Implemented Best Practices, following: John Papa's Guide"},
      {"feature": "Using Controller AS syntax"},
      {"feature": "Wrap Angular components in an Immediately Invoked Function Expression (IIFE)"},
      {"feature": "Declare modules without a variable using the setter syntax"},
      {"feature": "Using named functions"},
      {"feature": "Including Unit test with Karma"},
      {"feature": "Including UI options for Bootstrap or Angular-Material"},
      {"feature": "Including Angular-Material-Icons for Angular-Material UI"},
      {"feature": "Dynamic Menu generator for both themes"},
      {"feature": "Grunt task for Production and Development"}
    ];

    return {
      getFeaturesList: getFeaturesList
    };

    function getFeaturesList() {
      return list;
    }

  }

})();