'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ModalPaymentCtrl
 * @description
 * # ModalPaymentCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ModalPaymentCtrl', function($scope, $q, $filter, $window, $interval, $log,
                                             config, $uibModal, $uibModalInstance, ngNotify,
                                             payment, fields, getCurrentInvoice, getTDC, getTimeRemain){


  $scope.fields = fields;

  $scope.$watch(function(){
    return getTDC();
  },function(newVal){
    $scope.tdc = newVal;
  });

  $scope.$watch(function(){
    return getTimeRemain();
  },function(newVal){
    $scope.remain = newVal;

    if($scope.remain <0) {
      $uibModalInstance.dismiss('timeout');
    }
  });

  $scope.ok = function () {
    $uibModalInstance.close(form);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


  // set up a interval to check
  var intervalPromise = $interval(function(){
    if(getCurrentInvoice() != null) {
      payment.sendWechatQuery({invoice_id: getCurrentInvoice()})
        .$promise
        .then(function(resp){
          if(/SUCCESS/i.test(resp.result)) {
            // if succeed
            $uibModalInstance.close();
          }else if(!/USERPAYING/i.test(resp.result) && !/NOTPAY/i.test(resp.result)) {
            $uibModalInstance.dismiss(resp.result || 'unknown');
          }
        });
    }
  }, 2000);

  $scope.$on('$destroy', function () {
    $interval.cancel(intervalPromise);
  });


});
