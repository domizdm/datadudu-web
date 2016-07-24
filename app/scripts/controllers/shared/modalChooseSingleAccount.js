'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:SharedChooseSingleAccountCtrl
 * @description
 * # SharedChooseSingleAccountCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('SharedChooseSingleAccountCtrl', function($scope, $q, $filter, $window, $timeout, $log,
                                             config, $uibModal, $uibModalInstance, ngNotify, account){


  $scope.form = {
    toUser: null
  };

  $scope.searchAccounts = function(pattern){
    return account.search({username: pattern})
      .$promise
      .then(function(resp){
        return resp.users;
        //return _.map(resp.users, function(v){return v.username;});
      });
  };

  $scope.ok = function () {
    if($scope.form.toUser && $scope.form.toUser.user_id) {
      // return selected user's user_id

      //$log.log($scope.form);
      $uibModalInstance.close($scope.form.toUser);

    }else{
      ngNotify.set('It is not a valid user.', 'warn');
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
