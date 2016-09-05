'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ModalPaymentFailedCtrl
 * @description
 * # ModalPaymentFailedCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ModalPaymentFailedCtrl', function($scope, $q, $filter, $window, $timeout, $log,
                                             config, $uibModal, $uibModalInstance, ngNotify,
                                             feed, getCurrentInvoice, getCurrentAmount, getReason){


  $scope.getCurrentInvoice = getCurrentInvoice;
  $scope.getCurrentAmount = getCurrentAmount;
  $scope.getReason = getReason;

  $scope.parseReason = function(reason) {
    var ret = reason;

    if(/notpay/i.test(reason)) {
      ret = 'Transaction not paid';
    }else if(/closed/i.test(reason)) {
      ret = 'Transaction closed';
    }else if(/revoked/i.test(reason)) {
      ret = 'Transaction revoked';
    }else if(/payerror/i.test(reason)) {
      ret = 'Transaction error';
    }else if(/cancel/i.test(reason)) {
      ret = 'User canceled transaction dialog';
    }

    return ret;
  };

  $scope.retry = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
