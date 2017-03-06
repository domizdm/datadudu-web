'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('PaymentCtrl', function ($scope, $window, $interval, $log, $uibModal, $location, $routeParams, ngNotify, config, Auth, payment) {

  $scope.form = {
    bank_id: 'wechat',
    amount: 100,
    username: Auth.username()
  };

  var maxSecondsWait = 120;

  var currentTDC = '';
  var lastRequestSend = 0;
  var currentInvoice = null;

  $scope.sendChargeRequest = function(form) {

    // validation check
    if(isNaN(parseFloat($scope.form.amount)) || Math.round($scope.form.amount) != parseFloat($scope.form.amount)
      || parseFloat($scope.form.amount) <= 0) {

      ngNotify.set('Payment amount is invalid. It requires an positive integer.', 'error');
      return;
    }

    currentTDC = '';
    lastRequestSend = Date.now();
    currentInvoice = null;


    if($scope.form.bank_id=='alipay') {

      var targetUrl = config.END_POINT_PAYMENT + '/payment/payment.php'
        +'?bank_id='+$scope.form.bank_id
        +'&amount='+$scope.form.amount
        +'&username='+$scope.form.username;

      // redirect to php payment
      $window.open(targetUrl, '_blank');

      return;

    }else if($scope.form.bank_id=='wechat') {

      payment.sendChargeRequest(form)
        .$promise
        .then(function(resp){

          if(/success/.test(resp.result)) {
            currentTDC = resp.url;
            currentInvoice = resp.invoice_id;
          }else{
            lastRequestSend = lastRequestSend - maxSecondsWait * 1000;// trigger failed dialog
            currentInvoice = resp.invoice_id;
            ngNotify.set('Server return failed. Contact your administrator please.', 'error');
          }
        })
        .catch(function(err){

        });


      $uibModal.open({
          templateUrl: 'views/expensecenter/particle/modalPayment.html',
          controller: 'ModalPaymentCtrl',
          backdrop: false,
          resolve: {
            fields: function(){
              return form;
            },
            getCurrentInvoice: function() {
              return function() {
                return currentInvoice;
              }
            },
            getTDC: function() {
              return function(){
                return currentTDC;
              };
            },

            getTimeRemain: function() {
              return function(){
                return maxSecondsWait - getSecondsElapsed();
              }
            }
          }
        })
        .result
        .then(function(form){
          $scope.showSucceedDialog();
        }, function(reason){
          $scope.showFailedDialog(reason);
        });

      return;

    }else{
      // unsupported
    }

  };


  $scope.showSucceedDialog = function() {
    $uibModal.open({
        templateUrl: 'views/expensecenter/particle/modalPaymentSucceed.html',
        controller: 'ModalPaymentSucceedCtrl',
        resolve: {
          getCurrentInvoice: function() {
            return function() {
              return currentInvoice;
            }
          },
          getCurrentAmount: function() {
            return function() {
              return $scope.form.amount;
            }
          }
        }
      })
      .result
      .then(function(){
      }, function(){});
  };

  $scope.showFailedDialog = function(reason) {
    $uibModal.open({
        templateUrl: 'views/expensecenter/particle/modalPaymentFailed.html',
        controller: 'ModalPaymentFailedCtrl',
        resolve: {
          getCurrentInvoice: function() {
            return function() {
              return currentInvoice;
            }
          },
          getCurrentAmount: function() {
            return function() {
              return $scope.form.amount;
            }
          },
          getReason: function() {
            return function() {
              return reason;
            }
          }
        }
      })
      .result
      .then(function(){

        $scope.sendChargeRequest($scope.form);

      }, function(){});
  };


  var getSecondsElapsed = $scope.getSecondsElapsed = function() {
    return Math.ceil((Date.now() - lastRequestSend)/1000);
  };

  // set up a interval to check
  var intervalPromise = $interval(function(){
    // no codes here, but it triggers an angular loop
  }, 400);

  $scope.$on('$destroy', function () {
    $interval.cancel(intervalPromise);
  });



});
