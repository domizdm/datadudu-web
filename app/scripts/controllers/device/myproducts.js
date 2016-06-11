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


});
