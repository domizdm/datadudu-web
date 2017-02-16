'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:PlanCtrl
 * @description
 * #PlanCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('PlanCtrl', function ($scope, $window, $interval, $log, $uibModal, $location, $localStorage,
                                  $routeParams, ngNotify, config, Auth, $http, CurrentEntity, AvailablePlans) {

  $scope.channel = CurrentEntity.channel;

  $scope.package = AvailablePlans.plans;

  $scope.getTokenID = function () {
    return $localStorage.me ? $localStorage.me.token_id : null;
  };

//套餐升级价格查询（内部接口）
  var url = 'http://api.datadudu.cn/plan/upgrade_quote?token_id=' + $scope.getTokenID();
  //console.log(url);

  $http({
    url: url,
    method: 'GET',
    params: {
      channel_id: '57',
      plan_code: 'ub_s1'
    }
  }).success(function (response) {
    $scope.saleQuote = response.quote;
    console.log(response);
//响应成功
  }).error(function (data, header, config, status) {

//处理响应失败
  });


  //执行套餐变更


});
