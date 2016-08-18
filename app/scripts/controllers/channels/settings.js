'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsSettingsCtrl
 * @description
 * # ChannelsSettingsCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsSettingsCtrl', function($scope, $q, $filter, $route, $log, $location, Auth,
                                            config, $uibModal, ngNotify, modalConfirm, channel){

  $scope.form = null;

  //$scope.prompt = {label:Auth.L('modal-con.prompt')};


  $scope.$watch('channel', function(newVal){
    if(newVal) {
      $scope.form = _.extend({}, $scope.channel);
    }
  });

  $scope.saveChannel = function(entity){
    var query = _.extend({id:entity.channel_id}, entity);
    channel.update(query, {})// server cant accept put payload in json format
      .$promise
      .then(function(resp){
        $route.reload();

        ngNotify.set(Auth.L('modal-con.channel-updated'), 'success');
        //ngNotify.set('Channel updated', 'success');
      })
      .catch(function(err){
        // TODO: more error info
        ngNotify.set(Auth.L('modal-con.errors-happened'), 'error');
      });
  };


  $scope.clearFeed = function(form) {
    modalConfirm.open(Auth.L('modal-con.clean-data'))
      .then(function(){
        channel.clear({id: form.channel_id})
          .$promise
          .then(function(resp){
            ngNotify.set(Auth.L('modal-con.channel-cleared'), 'success');
          })
          .catch(function(err){
            // TODO: more error info
            ngNotify.set(Auth.L('modal-con.errors-happened'), 'error');
          });
      })
      .catch(function(){
        // do nothing
      });
  };

  $scope.deleteChannel = function(form) {
    modalConfirm.open(Auth.L('modal-con.delete-channel'))
      .then(function(){
        channel.remove({id: form.channel_id})
          .$promise
          .then(function(resp){
            ngNotify.set(Auth.L('modal-con.channel-removed'), 'success');
            $location.path('/channels');
          })
          .catch(function(err){
            // TODO: more error info
            ngNotify.set(Auth.L('modal-con.errors-happened'), 'error');
          });
      })
      .catch(function(){
        // do nothing
      });
  };


});
