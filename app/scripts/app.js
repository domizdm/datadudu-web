'use strict';

/**
 * @ngdoc overview
 * @name dataduduR3App
 * @description
 * # dataduduR3App
 *
 * Main module of the application.
 */
angular
.module('dataduduR3App', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
])
.config(function ($routeProvider, $httpProvider) {//, $locationProvider, utils

  // 没server端重定向,太难调试,暂时屏蔽
  //$locationProvider.html5Mode({ enabled: true, requireBase: true });

  // because endpoint is accepting request as traditional format,
  // we should set header content-type & intercept & convert it here for POST
  $httpProvider.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  //$httpProvider.interceptors.push(function($log, $httpParamSerializerJQLike) {//
  //  return {
  //    'request': function(config) {
  //      if(/post/i.test(config.method)) {
  //        config.data = $httpParamSerializerJQLike(config.data);
  //      }
  //      return config;
  //    },
  //  };
  //});

  $httpProvider.interceptors.push('RequestNormalizeInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'home'
    })
    .otherwise({
      redirectTo: '/'
    });
});
