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
      templateUrl:  'views/myaccount/myaccount.html',
      controller:'MyAccountCtrl'
    })
    .when('/editaccount',{
      templateUrl: 'views/myaccount/editaccount.html',
      controller:'EditAccountCtrl'
    })
    .when('/editprofile',{
      templateUrl: 'views/myaccount/editprofile.html',
      controller:'EditProfileCtrl'
    })
    .when('/accountsafety',{
      templateUrl: 'views/myaccount/accountsafety.html',
      controller:'AccountSafetyCtrl'
    })

    .when('/account',{
      templateUrl: 'views/myaccount/account.html',
      controller:'AccountCtrl'
    })

});

