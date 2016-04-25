'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsListCtrl
 * @description
 * # ChannelsListCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsListCtrl', function ($scope, $log, channel, Auth) {
  $scope.channels = null;

  channel.list()
    .$promise
    .then(function(resp){
      $scope.channels = resp.channels;
    })
    .catch(function(err){
      // TODO: show error message
      $log.log(err);
    });

});
