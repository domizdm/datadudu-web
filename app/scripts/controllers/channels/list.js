'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsListCtrl
 * @description
 * # ChannelsListCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsListCtrl', function ($scope, $log, $filter, $uibModal, $route, modalConfirm, channel, share, Auth, ngNotify) {
  //$scope.channel_info =$log.log(channel.usage  / channel.size_storage *100);

  $scope.channels = null;
  //$scope.channelsFiltered = null;
  //$scope.usage = null;

  $scope.searchText = '';
  $scope.channelNameList=null;

  $scope.$watch('channels', function(newVal){
    $scope.channelsFiltered = $filter('filter')($scope.channels, $scope.searchText);
  });

  $scope.$watch('searchText', function(newVal){
    $scope.channelsFiltered = $filter('filter')($scope.channels, $scope.searchText);
  });

  $scope.reloadChannels = function(){
    channel.list()
      .$promise
      .then(function(resp){
        console.log(resp)
        _.forEach(resp.channels, function(channel){
          channel.usage = parseFloat(channel.usage);
          channel.channel_storage = parseInt(channel.usage)  /  parseInt(channel.size_storage) * 100;
          channel.channel_flow =channel.traffic_out /  channel.size_out * 100;
          //console.log(channel.channel_flow)
        });

        $scope.channels = resp.channels;
      })

      .catch(function(err){

        // TODO: show error message
        $log.log(err);
      });
  };
  $scope.reloadChannels();



  $scope.checkedFlag = 'isChecked';
  $scope.getCheckedItems = function(items){
    var condition = {};
    condition[$scope.checkedFlag] = true;
    return $filter('filter')(items, condition);
  };

  $scope.shareChannels = function(channels){

    if(channels.length > 0) {
      var channelIds = _.map(channels, function(v){return v.channel_id;});
      var channelNames = _.map(channels, function(v){return v.name;});

      $uibModal.open({
          templateUrl: 'views/shared/modalChooseSingleAccount.html',
          controller: 'SharedChooseSingleAccountCtrl',
          resolve: {}
        })
        .result
        .then(function(user){
          if(user.user_id) {
            var msg = [Auth.L('share.shared-warning'), channelNames.join(','), Auth.L('share.shared-to'), user.username,'?'].join(' ');

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

                    $route.reload();
                  })
                  .catch(function(err){
                    ngNotify.set(err.data.desp || err.statusText, 'error');
                  });
              })
              .catch(function(){
                $scope.shareChannels($scope.getCheckedItems($scope.channels));
              });
          }
        }, function(){/*dismiss*/});

    }else{
      ngNotify.set(Auth.L('share.no-select-channels'), 'warn');
    }
  };

  $scope.getAccountUsage = function(){
    var usage = 0;
    try{
      usage = Auth.me().account.usage;
    }catch(e){}

    return usage;
  };

});
