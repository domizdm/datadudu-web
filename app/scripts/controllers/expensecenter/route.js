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

    .when('/renew/:channel_id',{
      templateUrl: 'views/expensecenter/renew.html',
      controller:'RenewCtrl',
      resolve: {
        CurrentEntity: ['channel', '$route', '$injector', function(channel, $route, $injector) {
          var $log = $injector.get('$log');
          var channel_id = $route.current.params.channel_id;

          return channel.get({id: channel_id}).$promise;
        }]
      }
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

