'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ModalPaymentSucceedCtrl
 * @description
 * # ModalPaymentSucceedCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ModalPaymentSucceedCtrl', function($scope, $q, $filter, $window, $timeout, $log,
                                             config, $uibModal, $uibModalInstance, ngNotify,
                                             feed, getCurrentInvoice, getCurrentAmount){


  $scope.getCurrentInvoice = getCurrentInvoice;
  $scope.getCurrentAmount = getCurrentAmount;
  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
