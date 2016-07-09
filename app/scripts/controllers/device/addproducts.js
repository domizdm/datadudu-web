'use strict';
angular.module('dataduduR3App')
.controller('AddProductsCtrl', function($scope, $q, $filter, $route, $log, $location, $routeParams,
                                       config, $uibModal, ngNotify, modalConfirm, product){

  $scope.loading = false;
  $scope.editMode = false;

  $scope.form = {
    name: '',
    description: '',
    metadata: ''

  };

  if($routeParams.id) {
    $scope.loading = true;
    $scope.editMode = true;

    product.get({id:$routeParams.id})
      .$promise
      .then(function(resp){
        $scope.loading = false;

        _.extend($scope.form, resp.product);

        for(var i=0; i<8; i++) {
          if($scope.form['field'+i]) {
            $scope.form['field'+i+'-enabled'] = true;
          }
        }
      })
      .catch(function(err){
        $scope.loading = false;
        ngNotify.set(err.data.desp || err.statusText, 'error');
      });
  }

  $scope.addProduct = function(form){

    $scope.loading = true;

    // create new instance
    product.create(null,form)
      .$promise
      .then(function(resp){
        $scope.loading = false;
        ngNotify.set('New product added.', 'success');

        $location.path('/myproducts');
      })
      .catch(function(err){
        $scope.loading = false;
        ngNotify.set(err.data.desp || err.statusText, 'error');
      });
  };

  $scope.updateProduct = function(form){

    $scope.loading = true;

    // create new instance
    product.update({id:$routeParams.id},form)
      .$promise
      .then(function(resp){
        $scope.loading = false;
        ngNotify.set('Product updated.', 'success');

        $route.reload();
      })
      .catch(function(err){
        $scope.loading = false;
        ngNotify.set(err.data.desp || err.statusText, 'error');
      });
  };

});




