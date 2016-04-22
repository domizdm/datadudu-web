'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('HomeCtrl', function ($scope, channel, Auth, $log) {
  angular.noop($log);

  Auth.isLoggedInAsync()
    .then();

  $scope.channels = null;

  var query = {token_id: Auth.tokenId()};
  channel.list(query)
    .$promise
    .then(function(resp){
      $scope.channels = resp.channels;
    })
    .catch(function(err){
      // TODO: show error message
      $log.log(err);
    });


});
