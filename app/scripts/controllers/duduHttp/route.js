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
.config(function ($routeProvider) {
  $routeProvider
    .when('/duduHttp', {
      templateUrl: 'views/duduHttp/list.html',
      controller: 'DuduHttpListCtrl'
    })
    .when('/duduHttp/create', {
      templateUrl: 'views/duduHttp/detail.html',
      controller: 'DuduHttpCreateCtrl'
    })
    .when('/duduHttp/:dudu_http_id', {
      templateUrl: 'views/duduHttp/detail.html',
      controller: 'DuduHttpEditCtrl'
    });
});
