'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:EditAccountCtrl
 * @description
 * # EditAccountCtrl
 * Controller of the dataduduR3App
 */

angular.module('dataduduR3App')
.controller('AccountSafetyCtrl', function($scope, $q, $filter, $window, $timeout, $log, $http, $route,
                                      config, $uibModal, ngNotify, modalConfirm, Auth, account){


  $scope.SafetyHide = false;
  $scope.toggle = function() {
    $scope.SafetyHide = !$scope.SafetyHide;
  };

  $scope.phoneHide = false;
  $scope.phone = function() {
    $scope.phoneHide = !$scope.phoneHide;
  };

  $scope.emailHide = false;
  $scope.email = function() {
    $scope.emailHide = !$scope.emailHide;
  };

  $scope.approveHide = false;
  $scope.approve = function() {
    $scope.approveHide = !$scope.approveHide;
  };

  $scope.questionHide = false;
  $scope.question = function() {
    $scope.questionHide = !$scope.questionHide;
  };

});


