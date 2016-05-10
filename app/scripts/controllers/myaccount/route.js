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
    .when('/myaccount',{
      templateUrl: 'views/myaccount/myaccount.html',
      controller:'MyAccountCtrl'
    })
});
