'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ToMeListCtrl
 * @description
 * # ToMeListCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ToMeListCtrl', function ($scope, $log, $filter, $uibModal, $route, modalConfirm, channel, share, Auth, ngNotify) {
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
    share.listChannelsOthersToMe()
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


});
