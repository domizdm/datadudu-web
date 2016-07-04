'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:MyDevicesMainCtrl
 * @description
 * # MyDevicesMainCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('MyDevicesMainCtrl', function ($scope, $routeParams, $route, $log, channel, product) {

  //channel页面导航显示、隐藏
  $scope.navhide = true;
  $scope.toggleNavhide = function() {
    $scope.navhide = !$scope.navhide;
  };

  $scope.channel = null;
  $scope.device = null;

  $scope.tabs = [
    //{key:'private',text:'Private View',template:'views/channels/private.html'},
    //{key:'realtime',text:'Real Time',template:'views/channels/realtime.html'},
    //{key:'public',text:'Public View',template:'views/channels/public.html'},
    {key:'settings',text:'Settings',template:'views/device/mydevices-settings.html'},
    //{key:'apikeys',text:'API Keys',template:'views/channels/apikeys.html'},
    {key:'commands',text:'Commands',template:'views/device/mydevices-commands.html'},
    {key:'rules',text:'Rules',template:'views/device/mydevices-rules.html'}
    //{key:'dataio',text:'Data Import/Export',template:'views/channels/dataio.html'}
  ];

  $scope.reloadTab = function(){
    $route.reload();
  };


  $scope.loadDevice = function(){
    product.listMyDevices()
      .$promise
      .then(function(resp){
        $scope.device = _.find(resp.devices, {device_id: $routeParams.id});

        $scope.loadChannel($scope.device.channel_id);
      })
      .catch(function(err){
        ngNotify.set(err.statusText, 'error');
      });
  };

  $scope.loadChannel = function(channel_id){
    channel.list()
      .$promise
      .then(function(resp){
        $scope.channel = _.find(resp.channels, {channel_id: channel_id});
      });
  };



  $scope.loadDevice();


});
