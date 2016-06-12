'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:EditAccountCtrl
 * @description
 * # EditAccountCtrl
 * Controller of the dataduduR3App
 */

angular.module('dataduduR3App')
.controller('EditAccountCtrl', function($scope, $q, $filter, $window, $timeout, $log, $http, $route,
                                      config, $uibModal, ngNotify, modalConfirm, Auth, account){

  $scope.myAccount = Auth.me().account;
  $scope.timezones = [];

  $scope.form = {
    user_id: $scope.myAccount.user_id,
    username: $scope.myAccount.username,
    email: $scope.myAccount.email,
    timezone: $scope.myAccount.timezone,

    password: '',
    isChangePassword: false,
    newPassword1: '',
    newPassword2: ''
  };

  $scope.isNewPassworMatch = function(){
    return $scope.form.newPassword1 === $scope.form.newPassword2;
  };

  account.timezones()
    .$promise
    .then(function(resp){
      $scope.timezones = resp.timezones;
    })
    .catch(function(){

    });

  $scope.saveAccountInfo = function(form){

    if(!$scope.isNewPassworMatch()) {
      ngNotify.set('Your new password does not match.', 'error');
      return;
    }

    var reqBody = {
      user_id: form.user_id,
      username: form.username,
      email: form.email,
      timezone: form.timezone,
      password: form.password
    };

    if(form.isChangePassword){
      reqBody.new_password = form.newPassword1;
    }

    account.updateAccount(reqBody)
      .$promise
      .then(function(resp){
        ngNotify.set('Account info updated.', 'success');

        // rebind account info from server
        Auth.rebind()
          .then(function(){
            $route.reload();
          });
      })
      .catch(function(err){
        // TODO: more error info
        ngNotify.set(err.data.desp || err.statusText, 'error');
      });

  };

});


