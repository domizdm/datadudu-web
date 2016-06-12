'use strict';

angular.module('dataduduR3App')
.controller('MyDevicesCtrl', function($scope, $q, $filter, $route, $log, $location, $routeParams,
                                           config, $uibModal, ngNotify, modalConfirm, product){

  $scope.devices = [];

  $scope.loadMyDevices = function(){
    product.listMyDevices()
      .$promise
      .then(function(resp){
        $scope.devices = resp.devices;
      })
      .catch(function(err){
        ngNotify.set(err.statusText, 'error');
      });
  };
  $scope.loadMyDevices();

  $scope.detachDevice = function(activation_code) {

    modalConfirm.open('Are you sure you want to detach this device? The associated channel and data will be removed.')
      .then(function(){
        product.detachDevice({id: activation_code}, {})
          .$promise
          .then(function(resp){
            ngNotify.set('Device detached.', 'success');

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

  $scope.openModalAttachDevice = function(){
    product.list()
      .$promise
      .then(function(resp){
        $uibModal.open({
            templateUrl: 'views/device/particle/modalAttachDevice.html',
            controller: 'AttachDeviceCtrl',
            size: 'lg',
            resolve: {
              privateProducts: function(){
                return resp.products;
              }
            }
          })
          .result
          .then(function(form){
            //$scope.reloadData();
            $route.reload();
          }, function(){/*dismiss*/});
      });
  };

});
