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

    {key:'settings',requireFullAcl:true,text:Auth.L('nav-data-header.seating'),template:'views/channels/settings.html'},
    {key:'apikeys',requireFullAcl:true,text:Auth.L('nav-data-header.apikey'),template:'views/channels/apikeys.html'},
    {key:'commands',requireFullAcl:true,text:Auth.L('nav-data-header.commands'),template:'views/channels/commands.html'},
    {key:'rules',requireFullAcl:true,text:Auth.L('nav-data-header.rules'),template:'views/channels/rules.html'},
    {key:'dataio',text:Auth.L('nav-data-header.im_ex'),template:'views/channels/dataio.html'},
    {key:'triggers',requireFullAcl:true,text:Auth.L('nav-data-header.triggers'),template:'views/channels/triggers.html'},
    {key:'public',requireFullAcl:true,text:Auth.L('nav-data-header.publicview'),template:'views/channels/public.html'}
  ];

  $scope.reloadTab = function(){
    $route.reload();
  };
  //channe1.channel_storage = parseInt(channel.usage)  /  parseInt(channel.size_storage) * 100 ;
  //channel.channel_flow =parseInt(channel.traffic_out)  /  parseInt(channel.size_out) *100 ;
  //channel.list()
  //  .$promise
  //  .then(function(resp){
  //    $scope.channel = _.find(resp.channels, {channel_id: $routeParams.id});
  //  });

  channel.get({id: $routeParams.id})
    .$promise
    .then(function(resp){

      $scope.channel = resp.channel;
      $scope.channel.channel_storage = parseInt(resp.channel.usage)  /  parseInt(resp.channel.size_storage) * 100 ;
      $scope.channel.channel_flow =parseInt(resp.channel.traffic_in)  /  parseInt(resp.channel.size_ou) *100 ;

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

  $scope.isInAcl = function(channel) {
    if(channel && channel.username==null) {
      // FIXME: 因为当前API有bug,返回的username全为null,因此为了避免影响tabs的显示,先判断是否为null,fix后此段应不起作用
      return true;
    }
    if(channel != null && Auth.username() != null && Auth.username() == channel.username) {
      return true;
    }
    return false;
  };

  $scope.shareChannel = function(channel) {

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
              share_to: user.user_id
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
