'use strict';
angular.module('dataduduR3App')
.controller('ProductDetailsCtrl', function($scope, $q, $filter, $route, $log, $location, $routeParams,
                                       config, $uibModal, ngNotify, modalConfirm, product){

  $scope.product = null;
  $scope.devices = [];

  $scope.searchText = '';
  $scope.seriesText = '';


  $scope.$watch('product', function(newVal){
    if(newVal) {
      $scope.loadDevices($routeParams.product_id);
    }
  });

  product.get({id: $routeParams.product_id})
    .$promise
    .then(function(resp){
      $scope.product = resp.product;
    })
    .catch(function(err){
      ngNotify.set(err.statusText, 'error');
    });


  $scope.loadDevices = function(productId){

    product.listDevices({id: productId})
      .$promise
      .then(function(resp){
        $scope.devices = resp.devices;
      })
      .catch(function(err){
        ngNotify.set(err.statusText, 'error');
      });
  };

  $scope.deleteDevice = function(activation_code) {
    modalConfirm.open('Do you want to delete this device?')
      .then(function(){
        product.deleteDevice({id: activation_code}, {})
          .$promise
          .then(function(resp){
            ngNotify.set('Device deleted.', 'success');

            $route.reload();
          })
          .catch(function(err){
            ngNotify.set(err.statusText, 'error');
          });
      })
      .catch(function(){
        // do nothing
      });
  };

  $scope.deleteProduct = function(productId) {
    modalConfirm.open('Do you want to delete this product?')
      .then(function(){
        product.delete({id: productId}, {})
          .$promise
          .then(function(resp){
            ngNotify.set('Product deleted.', 'success');

            $location.path('/myproducts');
          })
          .catch(function(err){
            ngNotify.set(err.statusText, 'error');
          });
      })
      .catch(function(){
        // do nothing
      });
  };

  $scope.editProduct = function(productId) {
    $location.path('/addproducts/'+productId);
  };

  $scope.addDevices = function(productId, seriesText){

    if(!productId) {
      $log.log('Product id is empty.');
      return;
    }

    if(!seriesText) {
      $log.log('Series text is empty.');
      return;
    }


    var devices = [];
    _.each(seriesText.split('\n'), function(v){
      var trimedValue = v.trim();
      if(trimedValue) {
        devices.push({serial: trimedValue});
      }
    });

    var form = {
      devices: devices
    };

    product.addDevices({id: productId}, form)
      .$promise
      .then(function(resp){
        ngNotify.set('New device(s) added.', 'success');

        $route.reload();
      })
      .catch(function(err){
        ngNotify.set(err.statusText, 'error');
      });
  };

});




