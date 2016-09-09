'use strict';

/**
 * @ngdoc overview
 * @name dataduduR3App
 * @description
 * # dataduduR3App
 *
 * Route module of the application.
 */
angular.module('dataduduR3App')
.config(function ($routeProvider, langTransProvider) {

  $routeProvider
    .when('/to-others', {
      templateUrl: 'views/to-others/list.html',
      controller: 'ToOthersListCtrl'
    });
});
