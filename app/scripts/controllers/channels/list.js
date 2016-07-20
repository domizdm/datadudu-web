'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsListCtrl
 * @description
 * # ChannelsListCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsListCtrl', function ($scope, $log, $filter, $uibModal, channel, Auth, ngNotify) {
  $scope.channels = null;
  $scope.channelsFiltered = null;

  $scope.searchText = '';

  //$scope.form = {
  //  selected:[]
  //};

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

    if(channels.length >= 0) {
      var channelIds = _.map(channels, function(v){return v.channel_id;});
      //$log.log(channelIds);

      $uibModal.open({
          templateUrl: 'views/shared/modalChooseSingleAccount.html',
          controller: 'SharedChooseSingleAccountCtrl',
          resolve: {
            //fields: function(){
            //  return $scope.channelsFields;
            //},
            //writeKey: function(){
            //  return writeKey;
            //}
          }
        })
        .result
        .then(function(form){}, function(){/*dismiss*/});

    }else{
      ngNotify.set('No channels selected.', 'warn');
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
