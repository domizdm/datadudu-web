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
  'ngStorage',
  'smart-table',
  'ngNotify',
  'ui.bootstrap',
  'angularMoment',
  'ngFileUpload',
  'ngTouch'
])
.config(function ($routeProvider, $httpProvider, stConfig) {//, $locationProvider, utils

  // 没server端重定向,太难调试,暂时屏蔽
  //$locationProvider.html5Mode({ enabled: true, requireBase: true });

  // because endpoint is accepting request as traditional format,
  // we should set header content-type & intercept & convert it here for POST
  $httpProvider.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  // authorization interceptor
  $httpProvider.interceptors.push('AuthorizationInterceptor');

  // normalize post request payload format as traditional
  $httpProvider.interceptors.push('RequestNormalizeInterceptor');

  // override smart-table pagination template
  stConfig.pagination.template = 'components/pagination-tmpl.html';

  // main router, others refer to **/route.js
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'home'
    })
      .otherwise({
      redirectTo: '/'
    });
})
.run(function(amMoment, Auth){
  // 有bug
  //moment.tz.setDefault('UTC');

  //moment.locale('en-gb');//zh-cn


  if(Auth.language() == 'zh-CN') {
    amMoment.changeLocale('zh-cn');
  }else{
    amMoment.changeLocale('en-gb');
  }

  Highcharts.setOptions({
    global: {
      timezoneOffset: (-new Date().getTimezoneOffset()/60),
      useUTC: false
    }
  });

})
.run(function(config, $window, $log){
  config.lang = window.lang ? window.lang : {};

  if(!window.lang) {
    $log.warn('No available language found! This could cause DataDudu bugs.');
  }
})
.constant('angularMomentConfig', {
  //timezone: 'Asia/Shanghai'
  //timezone: 'UTC'
});
