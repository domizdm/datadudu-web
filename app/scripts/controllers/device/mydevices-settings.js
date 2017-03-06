'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:MyDevicesSettingsCtrl
 * @description
 * # MyDevicesSettingsCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('MyDevicesSettingsCtrl', function($scope, $q, $filter, $route, $log, $location,
                                            config, $uibModal, ngNotify, modalConfirm, channel){

  $scope.form = null;
  $scope.templateType = null;

  //product id:
  //870e45f7cab04db39e0387da466db96a
  //4fb6dc0b014a4193b48579c910386adc
  //cff26ae19f0d4c8fa46bf7d9eaa9993e

  $scope.$watch('channel', function(newVal){
    if(newVal) {
      $scope.form = _.extend({}, $scope.channel);

      // 实际上因为每次点击tab都会重新加载route,所以每次点击都会重置为默认值
      // set template type to default when channel changed
      $scope.templateType = $scope.sensorTemplates[0];
    }
  });

  $scope.$watch('templateType', function(newVal){
    // 非自定义页面时对JSON进行parse
    if(!/custom/i.test($scope.templateType.key)) {
      try{
        $scope.form.metadata = JSON.parse($scope.form.metadata);
      }catch(e){
        $log.log('Parsing metadata failed. Fallback as an empty object.');
        $scope.form.metadata = {};
      }
    }else{
      try{
        $scope.form.metadata = JSON.stringify($scope.form.metadata);
      }catch(e){
        $log.log('Stringify metadata failed. Fallback as an empty string.');
      }
    }
  });

  $scope.saveChannel = function(entity){
    var query = _.extend({id:entity.channel_id}, entity);
    channel.update(query, {})// server cant accept put payload in json format
      .$promise
      .then(function(resp){
        $route.reload();

        ngNotify.set('Channel updated', 'success');
      })
      .catch(function(err){
        // TODO: more error info
        ngNotify.set('Errors happened', 'error');
      });
  };


  $scope.clearFeed = function(form) {
    modalConfirm.open('Do you want to clear this channel?')
      .then(function(){
        channel.clear({id: form.channel_id})
          .$promise
          .then(function(resp){
            ngNotify.set('Channel cleared', 'success');
          })
          .catch(function(err){
            // TODO: more error info
            ngNotify.set('Errors happened', 'error');
          });
      })
      .catch(function(){
        // do nothing
      });
  };

  $scope.deleteChannel = function(form) {
    modalConfirm.open('Do you want to delete this channel')
      .then(function(){
        channel.remove({id: form.channel_id})
          .$promise
          .then(function(resp){
            ngNotify.set('Channel removed', 'success');
            $location.path('/channels');
          })
          .catch(function(err){
            // TODO: more error info
            ngNotify.set('Errors happened', 'error');
          });
      })
      .catch(function(){
        // do nothing
      });
  };


});
