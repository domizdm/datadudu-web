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
      ret = '未支付';
    }else if(/closed/i.test(reason)) {
      ret = '已关闭';
    }else if(/revoked/i.test(reason)) {
      ret = '已撤销（刷卡支付）';
    }else if(/payerror/i.test(reason)) {
      ret = '支付问题';
    }else if(/cancel/i.test(reason)) {
      ret = 'User canceled transaction dialog before return.';
    }else if(/timeout/i.test(reason)) {
      ret = 'This transaction has been timeout.';
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
