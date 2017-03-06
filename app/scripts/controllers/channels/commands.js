'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsCommandsCtrl
 * @description
 * # ChannelsCommandsCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsCommandsCtrl', function($scope, $q, $filter, $route, $log, $location,Auth,
                                            config, $uibModal, ngNotify, modalConfirm, channel){

  $scope.form = null;
  $scope.showNewCommand = false;

  $scope.toggleShowNewCommand = function() {
    $scope.showNewCommand = !$scope.showNewCommand;
  };

  $scope.$watch('channel', function(newVal){
    if(newVal) {
      $scope.form = _.extend({}, $scope.channel);

      channel.listCommands({id:$scope.channel.channel_id})
        .$promise
        .then(function(resp){
          //$scope.form.commands = resp.commands;
          $scope.form.commands = resp.commands;
        })
        .catch(function(err){
          ngNotify.set(err.statusText, 'error');
        });
    }
  });

  $scope.deleteCommand = function(entity, commandId) {
    modalConfirm.open(Auth.L('commands.delete-commands'))
      .then(function(){
        channel.deleteCommand({id:entity.channel_id,type_id:commandId},{})
          .$promise
          .then(function(resp){
            ngNotify.set(Auth.L('commands.command-deleted'), 'success');
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

  $scope.deleteAllCommands = function(entity) {
    modalConfirm.open(Auth.L('commands.delete-all-commands'))
      .then(function(){
        channel.deleteAllCommands({id:entity.channel_id},{})
          .$promise
          .then(function(resp){
            ngNotify.set(Auth.L('commands.commands-deleted'), 'success');
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

})
.controller('ChannelsAddNewCommandCtrl', function($scope, $q, $filter, $route, $log, $location,Auth,
                                             config, $uibModal, ngNotify, modalConfirm, channel){
  $scope.newCommand = {};

  $scope.addNewCommand = function(entity, form){
    channel.addCommand({id:entity.channel_id},form)
      .$promise
      .then(function(resp){
        ngNotify.set( Auth.L('commands.new-command-add'), 'success');
        $route.reload();
      })
      .catch(function(err){
        // TODO: more error info
        ngNotify.set(err.statusText, 'error');
      });
  };

});
