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
.config(function ($routeProvider) {//, $locationProvider

  // 没server端重定向,太难调试,暂时屏蔽
  //$locationProvider.html5Mode({ enabled: true, requireBase: true });

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
