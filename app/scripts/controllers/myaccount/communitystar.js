'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:EditAccountCtrl
 * @description
 * # CommunityStarCtrl
 * Controller of the dataduduR3App
 */

angular.module('dataduduR3App')
.controller('CommunityStarCtrl', function($scope, $q, $filter, $window, $timeout, $log, $http, $route,
                                      config, $uibModal, ngNotify, modalConfirm, Auth, account){

  //channel页面导航显示、隐藏
  $scope.ShareHide = false;
  $scope.toggle = function() {
    $scope.ShareHide = !$scope.ShareHide;
  };

});


