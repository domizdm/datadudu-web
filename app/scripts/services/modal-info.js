'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.modalConfirm
 * @description
 * # modalConfirm
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('modalInfo', function ($uibModal, $q) {

  return {
    open: function(message) {
      return $q(function(resolve, reject){
        $uibModal.open({
            templateUrl: 'components/modal-info.html',
            controller: 'ModalInfoCtrl',
            backdrop: false,
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
.controller('ModalInfoCtrl', function($scope, $q, $filter, $window, $timeout, $log,
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
