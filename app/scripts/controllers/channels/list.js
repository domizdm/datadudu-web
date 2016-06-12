'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsListCtrl
 * @description
 * # ChannelsListCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsListCtrl', function ($scope, $log, $filter, channel, Auth) {
  $scope.channels = null;
  $scope.channelsFiltered = null;

  $scope.searchText = '';

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

  $scope.getAccountUsage = function(){
    var usage = 0;
    try{
      usage = Auth.me().account.usage;
    }catch(e){}

    return usage;
  };

});
