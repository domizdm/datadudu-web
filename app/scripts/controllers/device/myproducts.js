'use strict';
angular.module('dataduduR3App')
.controller('MyProductsCtrl', function($scope, $q, $filter, $route, $log, $location,
                                             config, $uibModal, ngNotify, modalConfirm, product){

  $scope.products = [];

  product.list()
    .$promise
    .then(function(resp){
      $scope.products = resp.products;
    })
    .catch(function(err){
      ngNotify.set(err.statusText, 'error');
    });

  //edit product
  $scope.editProduct = function(productId) {
    $location.path('/addproducts/'+productId);
  };

  $scope.openModalUploadIcon = function(){
    if($scope.products) {
      $uibModal.open({
          templateUrl: 'views/shared/modalUploadIcon.html',
          controller: 'DeviceUploadIconCtrl',
          backdrop: false,
          resolve: {
            productId: function() {
              return $scope.product;
            }
          }
        })
        .result
        .then(function(form){
          $route.reload();
        }, function(){/*dismiss*/});
    }
  };

});
