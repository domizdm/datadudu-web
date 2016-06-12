'use strict';
angular.module('dataduduR3App')
.controller('AddProductsCtrl', function($scope, $q, $filter, $route, $log, $location,
                                       config, $uibModal, ngNotify, modalConfirm, product){

  $scope.form = {
    name: '',
    description: '',
    metadata: ''

  };

  $scope.saveProduct = function(form){
    product.create(null,form)
      .$promise
      .then(function(resp){
        ngNotify.set('New product added.', 'success');

        $location.path('/myproducts');
      })
      .catch(function(err){
        // TODO: more error info
        ngNotify.set(err.statusText, 'error');
      });
  };


});




