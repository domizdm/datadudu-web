'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsApiKeysCtrl
 * @description
 * # ChannelsApiKeysCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsApiKeysCtrl', function($scope, $q, $filter, $route, $log, $location, Auth,
                                            config, $uibModal, ngNotify, modalConfirm, channel){

  $scope.form = null;

  $scope.$watch('channel', function(newVal){
    if(newVal) {
      $scope.form = _.extend({}, $scope.channel);

      channel.listAPIKeys({id:$scope.channel.channel_id})
        .$promise
        .then(function(resp){
          $scope.form.writeKey = resp.write_key;
          $scope.form.readKeys = resp.read_keys;
        })
        .catch(function(err){
          ngNotify.set(err.statusText, 'error');
        });
    }
  });

  $scope.generateWriteKey = function(entity){
    modalConfirm.open(Auth.L('api.generate-writekey'))
      .then(function(){
        channel.generateWriteKey({id:entity.channel_id},{})
          .$promise
          .then(function(resp){
            ngNotify.set(Auth.L('api.new-writekey-generated'), 'success');
            $route.reload();
          })
          .catch(function(err){
            // TODO: more error info
            ngNotify.set(err.statusText, 'error');
          });
      })
      .catch(function(){
        // do nothing
      });
  };

  $scope.saveNote = function(channel_id, key, note){
    var reqBody = {
      read_key: key,
      note: note
    };

    channel.updateReadKey({id:channel_id},reqBody)
      .$promise
      .then(function(resp){
        ngNotify.set(Auth.L('api.note-updated'), 'success');
        $route.reload();
      })
      .catch(function(err){
        // TODO: more error info
        ngNotify.set(err.data.desp || err.statusText, 'error');
      });
  };

  $scope.deleteReadKey = function(channel_id, key) {
    modalConfirm.open(Auth.L('api.key-removed-Prompt')+key+'?')
      .then(function(){
        var reqBody = {
          read_key: key
        };

        channel.deleteReadKey({id: channel_id}, reqBody)
          .$promise
          .then(function(resp){
            ngNotify.set( Auth.L('api.key-removed'), 'success');
            $route.reload();
          })
          .catch(function(err){
            // TODO: more error info
            ngNotify.set(err.data.desp || err.statusText, 'error');
          });
      })
      .catch(function(){
        // do nothing
      });
  };

  $scope.generateReadKey = function(channel_id){
    modalConfirm.open( Auth.L('api.generate-readkey'))
      .then(function(){
        channel.generateReadKey({id:channel_id},{})
          .$promise
          .then(function(resp){
            ngNotify.set(Auth.L('api.new-readkey-generated'), 'success');
            $route.reload();
          })
          .catch(function(err){
            // TODO: more error info
            ngNotify.set(err.data.desp || err.statusText, 'error');
          });
      })
      .catch(function(){
        // do nothing
      });
  };

});
