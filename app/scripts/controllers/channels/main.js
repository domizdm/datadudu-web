'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsMainCtrl
 * @description
 * # ChannelsMainCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsMainCtrl', function ($scope, $routeParams, $route, $uibModal, $log, modalConfirm, ngNotify,
                                          $location, Auth, channel, share) {

  //channel页面导航显示、隐藏
  $scope.navhide = true;
  $scope.toggle = function() {
    $scope.navhide = !$scope.navhide;
  };

  $scope.channel = null;

  $scope.tabs = [
    {key:'private',text:Auth.L('nav-data-header.PrivateView'),template:'views/channels/private.html'},
    {key:'realtime',text:Auth.L('nav-data-header.RealTime'),template:'views/channels/realtime.html'},

    {key:'settings',text:Auth.L('nav-data-header.seating'),template:'views/channels/settings.html'},
    {key:'apikeys',text:Auth.L('nav-data-header.apikey'),template:'views/channels/apikeys.html'},
    {key:'commands',text:Auth.L('nav-data-header.commands'),template:'views/channels/commands.html'},
    {key:'rules',text:Auth.L('nav-data-header.rules'),template:'views/channels/rules.html'},
    {key:'dataio',text:Auth.L('nav-data-header.im_ex'),template:'views/channels/dataio.html'},
    {key:'triggers',text:Auth.L('nav-data-header.triggers'),template:'views/channels/triggers.html'},
    {key:'public',text:Auth.L('nav-data-header.publicview'),template:'views/channels/public.html'}
  ];

  $scope.reloadTab = function(){
    $route.reload();
  };

  //channel.list()
  //  .$promise
  //  .then(function(resp){
  //    $scope.channel = _.find(resp.channels, {channel_id: $routeParams.id});
  //  });

  channel.get({id: $routeParams.id})
    .$promise
    .then(function(resp){
      $scope.channel = resp.channel;
    });


  $scope.openModalUploadIcon = function(){
    if($scope.channel) {
      $uibModal.open({
          templateUrl: 'views/shared/modalUploadIcon.html',
          controller: 'ChannelUploadIconCtrl',
          backdrop: false,
          resolve: {
            channelId: function() {
              return $scope.channel.channel_id;
            }
          }
        })
        .result
        .then(function(form){
          $route.reload();
        }, function(){/*dismiss*/});
    }
  };


  $scope.shareChannel = function(channel){

    if($scope.channel != null) {
      var channelIds = [channel.channel_id];
      var channelNames = [channel.name];

      $uibModal.open({
          templateUrl: 'views/shared/modalChooseSingleAccount.html',
          controller: 'SharedChooseSingleAccountCtrl',
          resolve: {}
        })
        .result
        .then(function(user){
          if(user.user_id) {
            var msg = ['Share this channel', channelNames.join(','), 'to', user.username,'?'].join(' ');

            var payload = {
              channels: channelIds,
              to: user.user_id
            };

            // open modal to confirm
            modalConfirm.open(msg)
              .then(function(){
                share.shareChannelsToUser({}, payload)
                  .$promise
                  .then(function(resp){
                    ngNotify.set(Auth.L('share.shared-successfully'), 'success');

                    if(/^public$/.test($routeParams.subview)) {
                      $route.reload();
                    }
                  })
                  .catch(function(err){
                    ngNotify.set(err.data.desp || err.statusText, 'error');
                  });
              })
              .catch(function(){
                $scope.shareChannel(channel);
              });
          }
        }, function(){/*dismiss*/});

    }
  };

});
