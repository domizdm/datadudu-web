'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsMainCtrl
 * @description
 * # ChannelsMainCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsMainCtrl', function ($scope, $routeParams, $log, channel) {

  $scope.channel = null;

  $scope.tabs = [
    {key:'private',text:'Private View',template:'views/channels/private.html'},
    {key:'public',text:'Public View',template:'views/channels/public.html'},
    {key:'settings',text:'Settings',template:'views/channels/settings.html'},
    {key:'apikeys',text:'API Keys',template:'views/channels/apikeys.html'},
    {key:'commands',text:'API Keys',template:'views/channels/commands.html'},
    {key:'rules',text:'Rules',template:'views/channels/rules.html'},
    {key:'dataio',text:'Data Import/Export',template:'views/channels/dataio.html'}
  ];

  channel.list()
    .$promise
    .then(function(resp){
      $scope.channel = _.find(resp.channels, {channel_id: $routeParams.id});
    });


})
.controller('ChannelsPrivateCtrl', function($scope){
  $scope.durations = [
    {label:'1 hour', value:'1'},
    {label:'2 hours', value:'2'},
    {label:'4 hours', value:'4'},
    {label:'8 hours', value:'8'},
    {label:'24 hours', value:'24'}
  ];

  $scope.query = {
    begin: new Date(),
    duration: $scope.durations[0]
  };

});
