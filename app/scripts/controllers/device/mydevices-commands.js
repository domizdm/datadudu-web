'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:MyDevicesCommandsCtrl
 * @description
 * # MyDevicesCommandsCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('MyDevicesCommandsCtrl', function($scope, $q, $filter, $route, $log, $location,
                                            config, $uibModal, ngNotify, modalConfirm, channel){

  $scope.form = null;
  $scope.showNewCommand = false;
  $scope.loading = false;
  $scope.templateType = null;

  $scope.toggleShowNewCommand = function() {
    $scope.showNewCommand = !$scope.showNewCommand;
  };

  $scope.$watch('channel', function(newVal){
    if(newVal) {
      $scope.form = _.extend({}, $scope.channel);

      // 实际上因为每次点击tab都会重新加载route,所以会此点击都会重置为默认值
      // set template type to default when channel changed
      $scope.templateType = $scope.sensorTemplates[0];

      $scope.loadCommands();
    }
  });

  $scope.loadCommands = function(){
    $scope.loading = true;
    channel.listCommands({id:$scope.channel.channel_id})
      .$promise
      .then(function(resp){
        $scope.loading = false;
        $scope.form.commands = resp.commands;
      })
      .catch(function(err){
        $scope.loading = false;
        ngNotify.set(err.statusText, 'error');
      });
  };

  $scope.deleteCommand = function(entity, commandId) {
    modalConfirm.open('Do you want to delete this command?')
      .then(function(){
        channel.deleteCommand({id:entity.channel_id,type_id:commandId},{})
          .$promise
          .then(function(resp){
            ngNotify.set('Command deleted', 'success');
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
    modalConfirm.open('Do you want to delete all commands?')
      .then(function(){
        channel.deleteAllCommands({id:entity.channel_id},{})
          .$promise
          .then(function(resp){
            ngNotify.set('Commands deleted', 'success');
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

  //$scope.toggleShowNewCommand();

})
.controller('MyDevicesAddNewCommandCtrl', function($scope, $q, $filter, $route, $log, $location,
                                             config, $uibModal, ngNotify, modalConfirm, channel){
  $scope.newCommand = {};

  $scope.newCommandValueShow = false;
  $scope.newCommandValueType = 'text';

  $scope.commandsForTag = [
    {group:'Intelligent Tag',key:'cm_led',text:'命令操作LED亮','tooltip':'亮的秒数，例如 5， led亮5秒后关闭'},
    {group:'Intelligent Tag',key:'cm_buzzer',text:'命令操作蜂鸣器','tooltip':'蜂鸣器鸣响描述，例如 10'},
    {group:'Intelligent Tag',key:'cm_power_off',text:'命令操作关机','tooltip':'命令操作关机'}
  ];

  $scope.$watch('newCommand.commandType',function(newVal){
    if(newVal && (newVal.key=='cm_led' || newVal.key=='cm_buzzer')) {
      $scope.newCommandValueShow = true;
      $scope.newCommandValueType = 'number';
    }else{
      $scope.newCommandValueShow = false;
      $scope.newCommandValueType = 'text';

      delete $scope.newCommand.commandValue;
    }
  });

  $scope.addNewCommand = function(entity, form){

    if(!form.commandType) {
      ngNotify.set('Require a specified command to create.', 'warn');
      return;
    }

    var cmdArr = [];
    cmdArr.push(form.commandType.key);
    if(form.commandValue !== undefined) {
      cmdArr.push(form.commandValue);
    }
    form.command_string = cmdArr.join('=');

    channel.addCommand({id:entity.channel_id},form)
      .$promise
      .then(function(resp){
        ngNotify.set('New command added.', 'success');
        $route.reload();
      })
      .catch(function(err){
        // TODO: more error info
        ngNotify.set(err.statusText, 'error');
      });
  };

});
