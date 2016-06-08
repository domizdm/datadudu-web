'use strict';
angular.module('dataduduR3App')
.controller('ProductDetailsCtrl', function($scope, $q, $filter, $route, $log, $location, $routeParams,
                                       config, $uibModal, ngNotify, modalConfirm, product){

  $scope.product = null;
  $scope.devices = [];

  $scope.searchText = '';


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

});




