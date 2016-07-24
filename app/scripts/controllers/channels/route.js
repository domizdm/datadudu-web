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
.config(function ($routeProvider, langTransProvider) {

  console.log();

  $routeProvider
    .when('/channels', {
      templateUrl: langTransProvider.T('views/channels/list','html'),
      controller: 'ChannelsListCtrl'
    })
    .when('/channels/new', {
      templateUrl: 'views/channels/create.html',
      controller: 'ChannelsCreateCtrl'
    })
    .when('/channels/:id/:subview', {
      templateUrl: function(urlattr){
       //console.log(urlattr);
        return 'views/channels/main.html';
      },
      controller: 'ChannelsMainCtrl'
    })
});
