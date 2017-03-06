'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:EditAccountCtrl
 * @description
 * # EditAccountCtrl
 * Controller of the dataduduR3App
 */

angular.module('dataduduR3App')
.controller('AccountSafetyCtrl', function($scope, $q, $filter, $window, $timeout, $log, $http, $route,
                                      config, $uibModal, ngNotify, modalConfirm, Auth, account){

  $scope.account = Auth.me().account;

  $scope.SafetyHide = false;
  $scope.toggle = function() {
    $scope.SafetyHide = !$scope.SafetyHide;
  };

  $scope.phoneHide = false;
  $scope.phone = function() {
    $scope.phoneHide = !$scope.phoneHide;
  };

  $scope.emailHide = false;
  $scope.email = function() {
    $scope.emailHide = !$scope.emailHide;
  };

  $scope.approveHide = false;
  $scope.approve = function() {
    $scope.approveHide = !$scope.approveHide;
  };

  $scope.questionHide = false;
  $scope.question = function() {
    $scope.questionHide = !$scope.questionHide;
  };

  $scope.resetAccountKey = resetAccountKey;
  function resetAccountKey() {
    modalConfirm.open('要重置账户密钥吗?')
      .then(function(){
        account.generateAccountKey()
          .$promise
          .then(function(resp){
            ngNotify.set('密钥已重置', 'success');

            // rebind account info from server
            Auth.rebind()
              .then(function(){
                $route.reload();
              });
          })
          .catch(function(err){
            // TODO: more error info
            ngNotify.set(err.statusText, 'error');
          });
      })
      .catch(function() {
        // do nothing
      });
  };

});


