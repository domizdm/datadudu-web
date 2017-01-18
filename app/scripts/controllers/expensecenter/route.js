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
    .when('/consumerdetails',{
      templateUrl:  'views/expensecenter/consumerdetails.html',
      controller:'ConsumerDetailsCtrl'
    })
    .when('/ordermanagement',{
      templateUrl: 'views/expensecenter/ordermanagement.html',
      controller:'OrderManagementCtrl'
    })
    .when('/payment',{
      templateUrl: 'views/expensecenter/payment.html',
      controller:'PaymentCtrl'
    })

    .when('/renew',{
      templateUrl: 'views/expensecenter/renew.html',
      controller:'RenewCtrl'
    })

    .when('/renewpayment',{
      templateUrl: 'views/expensecenter/renewpayment.html',
      controller:'RenewPaymentCtrl'
    })

    .when('/renewresult',{
      templateUrl: 'views/expensecenter/renewresult.html',
      controller:'RenewResultCtrl'
    })

});

