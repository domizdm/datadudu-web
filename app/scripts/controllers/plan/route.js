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
    .when('/plan/:channel_id',{
      templateUrl:  'views/plan/plan.html',
      controller:'PlanCtrl',
      resolve: {
        CurrentEntity: ['channel', '$route', '$injector', function(channel, $route, $injector) {
          var $log = $injector.get('$log');
          var channel_id = $route.current.params.channel_id;

          return channel.get({id: channel_id}).$promise;
        }],
        AvailablePlans: ['plan', '$route', '$injector', function(plan, $route, $injector) {
          return plan.list().$promise;
        }]
      }
    })

});

