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
  $scope.templateType = null;

  //$scope.prompt = {label:Auth.L('modal-con.prompt')};

  $scope.duduTemplates = [
    {key:'tag', text:'Intelligent Tag',settingsPage:'views/channels/particle/settings/intelligent-tag.html'},
    {key:'custom', text:'Custom',settingsPage:'views/channels/particle/settings/custom.html'},
  ];

  $scope.$watch('channel', function(newVal){
    if(newVal) {
      $scope.form = _.extend({}, $scope.channel);

      // 实际上因为每次点击tab都会重新加载route,所以每次点击都会重置为默认值
      // set template type to default when channel changed
      // TODO: 以后可能根据product id选择不同的模版
      $scope.templateType = $scope.duduTemplates[0];
    }
  });

  $scope.$watch('templateType', function(newVal){
    if($scope.templateType != null) {
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
    }else{
      // 如果为null,意味着channel未加载
      // DO NOTHING
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
