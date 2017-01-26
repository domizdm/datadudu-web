'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:PackageCtrl
 * @description
 * #PackageCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('PackageCtrl', function ($scope, $window, $interval, $log, $uibModal, $location, $localStorage,$routeParams, ngNotify, config, Auth, $http) {
$scope.getTokenID=function() {
    return $localStorage.me ? $localStorage.me.token_id : null;
  };
//  $scope.getTokenID=auth.me().account.token_id;
   $http({
    url:' http://api.datadudu.cn/plan/list',
    method:'GET'
  }).success(function(response){
     $scope.package=response.plans;
       console.log(response);
//响应成功
  }).error(function(data,header,config,status){

//处理响应失败
  });

  var url='http://api.datadudu.cn/plan/upgrade_quote?token_id='+$scope.getTokenID();
  console.log(url);

  $http({
    url:url,
    method:'GET',
    params:{
      channel_id:'57',
      plan_code :'ub_free'
    }
  }).success(function(response){
    $scope.package=response.quote;
//响应成功
  }).error(function(data,header,config,status){

//处理响应失败
  });

});
