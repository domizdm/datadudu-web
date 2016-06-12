'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsMainCtrl
 * @description
 * # ChannelsMainCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsMainCtrl', function ($scope, $routeParams, $route, $log, channel) {

  $scope.channel = null;

  $scope.tabs = [
    {key:'private',text:'Private View',template:'views/channels/private.html'},
    {key:'realtime',text:'Real Time',template:'views/channels/realtime.html'},
    {key:'public',text:'Public View',template:'views/channels/public.html'},
    {key:'settings',text:'Settings',template:'views/channels/settings.html'},
    {key:'apikeys',text:'API Keys',template:'views/channels/apikeys.html'},
    {key:'commands',text:'Commands',template:'views/channels/commands.html'},
    {key:'rules',text:'Rules',template:'views/channels/rules.html'},
    {key:'dataio',text:'Data Import/Export',template:'views/channels/dataio.html'}
  ];

  $scope.reloadTab = function(){
    $route.reload();
  };

  channel.list()
    .$promise
    .then(function(resp){
      $scope.channel = _.find(resp.channels, {channel_id: $routeParams.id});
    });


});
