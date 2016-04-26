'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsAddPointCtrl
 * @description
 * # ChannelsAddPointCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsAddPointCtrl', function($scope, $q, $filter, $window, $timeout, $log,
                                             config, $uibModal, $uibModalInstance, ngNotify, fields){

  $scope.fields = fields;

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
