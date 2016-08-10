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
    .when('/accountinquiry',{
      templateUrl:  'views/expensecenter/accountinquiry.html',
      controller:'AccountInquiryCtrl'
    })
    .when('/ordermanagement',{
      templateUrl: 'views/expensecenter/ordermanagement.html',
      controller:'OrderManagementCtrl'
    })

});

