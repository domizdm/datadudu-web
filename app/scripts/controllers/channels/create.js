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
    $log.log(entity);

    //var query = {token_id: Auth.tokenId()};

    channel.create(null, entity)
      .$promise
      .then(function(resp){
        $location.path('/channels');
      })
      .catch(function(err){
        // TODO: more error info
        ngNotify.set('Errors happened', 'error');
      });

    ngNotify.set('channel added', 'success');
  };
});
