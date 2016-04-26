'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.modalConfirm
 * @description
 * # modalConfirm
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('modalConfirm', function ($uibModal, $q) {

  return {
    open: function(message) {
      return $q(function(resolve, reject){
        $uibModal.open({
            templateUrl: 'components/modal-confirm.html',
            controller: 'ModalConfirmCtrl',
            resolve: {
              message: function(){
                return message;
              }
            }
          })
          .result
          .then(function(){
            resolve();
          }, function(){
            reject();
          });
      });
    }
  };

})
.controller('ModalConfirmCtrl', function($scope, $q, $filter, $window, $timeout, $log,
                                         config, $uibModal, $uibModalInstance, ngNotify,
                                         message){

  $scope.message = message;

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  };
});
