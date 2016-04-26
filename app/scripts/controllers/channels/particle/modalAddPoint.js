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
                                             config, $uibModal, $uibModalInstance, ngNotify,
                                             channel, fields, writeKey){

  $scope.fields = fields;
  $scope.form = {
    created_at: new Date()
  };

  $log.log(writeKey);

  $scope.ok = function () {
    $uibModalInstance.close($scope.form);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
