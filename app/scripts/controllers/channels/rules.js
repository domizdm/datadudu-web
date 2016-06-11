'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsRulesCtrl
 * @description
 * # ChannelsRulesCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsRulesCtrl', function($scope, $q, $filter, $route, $log, $location,
                                            config, $uibModal, ngNotify, modalConfirm, channel){

  $scope.form = null;

  $scope.$watch('channel', function(newVal){
    if(newVal) {
      $scope.form = _.extend({}, $scope.channel);

      $scope.channelsFields = {};
      _.each($scope.channel, function(v,k){
        if(/^field\d+/.test(k)) {
          $scope.channelsFields[k] = {// k= field1, ... (string)
            key: k,
            text: v
          };
        }
      });

      $scope.reloadData();
    }
  });

  $scope.reloadData = function(){
    channel.listRules({id:$scope.channel.channel_id})
      .$promise
      .then(function(resp){
        $scope.form.rules = resp.rules;
      })
      .catch(function(err){
        ngNotify.set(err.statusText, 'error');
      });
  };

  var getRuleName = function(rule){
    return rule.rule_name ? rule.rule_name : 'Rule'+rule.rule_id;
  };
  $scope.getRuleName = getRuleName;

  $scope.openModalEditRule = function(rule){
    if($scope.channel) {
      // TODO: 实际上这里用不到api_key,可以去除这个ajax,只作为备用
      channel.listAPIKeys({id:$scope.channel.channel_id})
        .$promise
        .then(function(resp){
          var channelId = $scope.channel.channel_id;
          var currentRule = rule;

          $uibModal.open({
              templateUrl: 'views/channels/particle/modalEditRule.html',
              controller: 'ChannelsEditRuleCtrl',
              size: 'lg',
              resolve: {
                fields: function(){
                  return $scope.channelsFields;
                },
                channelId: function(){
                  return channelId;
                },
                rule: function(){
                  return currentRule;
                }
              }
            })
            .result
            .then(function(form){
              //$scope.reloadData();
              $route.reload();
            }, function(){/*dismiss*/});
        })
        .catch(function(err){
          ngNotify.set(err.statusText, 'error');
        });
    }
  };


  $scope.deleteRule = function(rule) {
    modalConfirm.open('Do you want to delete this rule?')
      .then(function(){
        channel.deleteRule({id: $scope.channel.channel_id, type_id: rule.rule_id})
          .$promise
          .then(function(resp){
            ngNotify.set('Rule removed', 'success');
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

  $scope.deleteAllRules = function() {
    modalConfirm.open('Do you want to delete all rules?')
      .then(function(){
        channel.deleteAllRules({id: $scope.channel.channel_id},{})
          .$promise
          .then(function(resp){
            ngNotify.set('Rules deleted', 'success');
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



});
