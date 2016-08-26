'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsPublicCtrl
 * @description
 * # ChannelsPublicCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsPublicCtrl', function($scope, $q, $filter, $route, $log, $location, Auth,
                                            config, $uibModal, ngNotify, modalConfirm, channel, share){

  $scope.form = null;

  //$scope.prompt = {label:Auth.L('modal-con.prompt')};

  $scope.shares = [];


  $scope.$watch('channel', function(newVal){
    if(newVal) {
      $scope.form = _.extend({}, $scope.channel);

      $scope.listChannelAcl();
    }
  });

  $scope.listChannelAcl = function() {
    var query = _.extend({}, {channel_id:$scope.channel.channel_id});
    share.listChannelAcl(query, {})
      .$promise
      .then(function(resp){
        $scope.shares = resp.channels;
      })
      .catch(function(err){
        ngNotify.set(Auth.L('modal-con.errors-happened'), 'error');
      });
  };

  $scope.deleteShare = function(channel) {

    var payload = _.extend({}, {share_ids:[channel.share_id]});

    var msg = "Do you want to remove the access authority for " + channel.username + "?";

    // open modal to confirm
    modalConfirm.open(msg)
      .then(function(){
        share.deleteShare({}, payload)
          .$promise
          .then(function(resp){
            ngNotify.set('The authority has been removed.', 'success');

            $route.reload();
          })
          .catch(function(err){
            ngNotify.set(err.data.desp || err.statusText, 'error');
          });
      })
      .catch(function(){
        ngNotify.set(Auth.L('modal-con.errors-happened'), 'error');
      });
  };


});
