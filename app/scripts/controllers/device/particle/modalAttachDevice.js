'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:AttachDeviceCtrl
 * @description
 * # AttachDeviceCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('AttachDeviceCtrl', function($scope, $q, $filter, $window, $timeout, $log,
                                             config, $uibModal, $uibModalInstance, ngNotify,
                                             product, privateProducts){

  $scope.currentTab = 'tabByActivationCode';

  $scope.changeTab = function(tabKey){
    $scope.currentTab = tabKey;
  };

  $scope.publicProducts = [];
  $scope.privateProducts = privateProducts;

  $scope.formByActivationCode = {
    activationCode: '',
  };

  $scope.formByProductId = {
    deviceType: 'private',// private/public

    product: null,
    searchProductName: '',

    productId: '',
    serial: ''
  };

  var resetFormByProductId = function(){
    $scope.formByProductId.product = null;
    $scope.formByProductId.searchProductName = '';
    $scope.formByProductId.productId = '';
    $scope.formByProductId.serial = '';
  };

  $scope.onChangeDeviceType = function(){
    resetFormByProductId();

    $scope.publicProducts = [];
  };

  $scope.onProductChange = function(productId) {
    $scope.formByProductId.productId = productId;
  };

  $scope.onSearchProduct = function(pattern){
    product.listPublic({name:pattern})
      .$promise
      .then(function(resp){
          $scope.publicProducts = resp.products;
      });
  };

  $scope.attachByActivationCode = function(activationCode){

    if(!activationCode) {
      ngNotify.set('Activation code should not be empty.', 'error');
      return;
    }

    var reqBody = {
      id: activationCode
    };

    product.attachDeviceByActivationCode(reqBody, {})
      .$promise
      .then(function(resp){
        ngNotify.set('Device attached.', 'success');
        $uibModalInstance.close(reqBody);
      })
      .catch(function(err){
        ngNotify.set(err.data.desp || err.statusText, 'error');
      });
  };

  $scope.attachByProductId = function(productId, serial){

    if(!productId || !serial) {
      ngNotify.set('Both product id and serial fields should not be empty.', 'error');
      return;
    }

    var reqBody = {
      id: productId,
      type_id: serial
    };

    product.attachDeviceByPidAndSerial(reqBody, {})
      .$promise
      .then(function(resp){
        ngNotify.set('Device attached.', 'success');
        $uibModalInstance.close(reqBody);
      })
      .catch(function(err){
        ngNotify.set(err.data.desp || err.statusText, 'error');
      });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
