'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsCreateCtrl
 * @description
 * # ChannelsCreateCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsCreateCtrl', function ($scope, $log, $location, ngNotify, Auth, channel) {
  $scope.saveChannel = function(entity){
    channel.create(null, entity)
      .$promise
      .then(function(resp){
        $location.path('/channels');
        ngNotify.set(Auth.L('create-channel.create-channel'), 'success');
      })
      .catch(function(err){
        // TODO: more error info
        ngNotify.set(Auth.L('create-channel.errors-happened'), 'error');
      });
  };
});
