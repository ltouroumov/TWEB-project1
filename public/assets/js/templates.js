angular.module('tweb-ghexplorer').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/home/graph.html',
    "<div class=\"container\">\n" +
    "  <div class=\"col-xs-12\">\n" +
    "    <h1>An awesome chart</h1>\n" +
    "    <canvas id=\"doughnut\" class=\"chart chart-doughnut\" chart-data=\"data\" chart-labels=\"labels\"></canvas>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/home/home.html',
    "<div class=\"container\">\n" +
    "  <div class=\"col-xs-12\">\n" +
    "    <h1>{{ title }}</h1>\n" +
    "    <p>Version {{ version }}</p>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/menu/menu.html',
    "<ul class=\"nav navbar-nav navbar-right\">\n" +
    "  <li ng-repeat=\"(name, ref) in menus\">\n" +
    "    <a ui-sref=\"root.{{ref}}\">{{name}}</a>\n" +
    "  </li>\n" +
    "</ul>"
  );

}]);
