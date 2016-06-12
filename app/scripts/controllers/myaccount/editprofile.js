'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:EditProfileCtrl
 * @description
 * # EditProfileCtrl
 * Controller of the dataduduR3App
 */

angular.module('dataduduR3App')
  .controller('EditProfileCtrl', function($scope, $q, $filter, $window, $timeout, $log, $http, $route,
                                          config, $uibModal, ngNotify, modalConfirm, Auth, account){

    $scope.myAccount = Auth.me().account;

    $scope.form = {
      website: $scope.myAccount.website,
      bio: $scope.myAccount.bio,
      public_flag: /true/i.test($scope.myAccount.public_flag)
    };

    $scope.saveProfile = function(form){

      var reqBody = {
        website: form.website,
        bio: form.bio,
        public_flag: form.public_flag
      };

      if(form.isChangePassword){
        reqBody.new_password = form.newPassword1;
      }

      account.updateProfile(reqBody)
        .$promise
        .then(function(resp){
          ngNotify.set('Profile info updated.', 'success');

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


