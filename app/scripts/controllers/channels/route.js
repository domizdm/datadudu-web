'use strict';

/**
 * @ngdoc overview
 * @name dataduduR3App
 * @description
 * # dataduduR3App
 *
 * Main module of the application.
 */
angular.module('dataduduR3App')
.config(function ($routeProvider) {
  $routeProvider
    .when('/channels', {
      templateUrl: 'views/channels/list.html',
      controller: 'ChannelsListCtrl'
    })
    .when('/channels/:subview', {
      templateUrl: function(urlattr){
        console.log(urlattr);
        return 'views/channels/main.html';
      },
      controller: 'ChannelsMainCtrl'
    })
});
