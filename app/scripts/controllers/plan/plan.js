'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:PlanCtrl
 * @description
 * #PlanCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('PlanCtrl', function ($rootScope, $scope, $window, $interval, $log, $uibModal, $location, $localStorage, $q,
                                  $routeParams, ngNotify, config, Auth, $http, plan, modalInfo, $route,
                                  CurrentEntity, AvailablePlans) {

  $scope.channel = CurrentEntity.channel;

  $scope.package = AvailablePlans.plans;

  $scope.currentQuote = _.find(AvailablePlans.plans, {plan_code: $scope.channel.plan_code});

  var showingDialog = false;//prevent duplicate dialog

  $scope.showApplyDialog = function(plan_code, channel_id) {
    var targetPlan = _.find(AvailablePlans.plans, {plan_code: plan_code});

    var payload = {plan_code: plan_code, channel_id: channel_id};

    if(showingDialog) return;

    showingDialog = true;

    $uibModal.open({
        templateUrl: 'views/plan/particle/packageChangeAffirm.html',
        controller: 'ModalPlanApplyConfirmCtrl',
        resolve: {
          TargetPlan: targetPlan,
          TargetQuote: plan.upgradeQuote(payload).$promise
        }
      })
      .result
      .then(function(){

        showingDialog = false;

        plan.upgrade(payload)
          .$promise
          .then(function(resp){

            if(resp.result == 'success') {
              modalInfo.open('恭喜您，套餐更改成功！')
                .then(function(){
                  // broadcast event for refreshing balance of account info
                  // please receive this event in main-header controller
                  $rootScope.$broadcast('ubibot::updateAccount');

                  $route.reload();
                });
            }else{
              modalInfo.open('对不起，变更失败！');
            }
          })
          .catch(function(err){
            modalInfo.open(err.data.desp);
          });
      }, function(){
        showingDialog = false;
      });
  };


});
