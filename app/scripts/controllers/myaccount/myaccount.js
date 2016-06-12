'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:MyAccountCtrl
 * @description
 * # MyAccountCtrl
 * Controller of the dataduduR3App
 */

angular.module('dataduduR3App')
.controller('MyAccountCtrl', function($scope, $q, $filter, $window, $timeout, $log, $http, $route,
                                            config, $uibModal, ngNotify, modalConfirm, Auth, account){

  $scope.myAccount = Auth.me().account;

  $scope.generateAccountKey = function(){
    modalConfirm.open('Do you want to generate new account key?')
      .then(function(){
        account.generateAccountKey()
          .$promise
          .then(function(resp){
            ngNotify.set('New account key generated.', 'success');

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
      .catch(function(){
        // do nothing
      });
  };

});
