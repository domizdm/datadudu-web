'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:SharedChooseSingleAccountCtrl
 * @description
 * # SharedChooseSingleAccountCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ModalPlanApplyConfirmCtrl', function($scope, $q, $filter, $window, $timeout, $log,
                                                  config, $uibModal, $uibModalInstance, ngNotify,
                                                  TargetPlan, TargetQuote){


  $scope.plan = TargetPlan;
  $scope.quote = TargetQuote;

  $scope.form = {
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.form);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
