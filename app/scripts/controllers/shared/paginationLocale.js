'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:PaginationLocaleCtrl
 * @description
 * # PaginationLocaleCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('PaginationLocaleCtrl', function($scope, $log, Auth, config){

  // 因为pagination的插件使用的是一个独立的scope,父scope变量无法传递,必须重新分配Lang变量
  // ----- Language Begin ----
  $scope.appLanguage = Auth.language();
  $scope.Lang = config.lang[$scope.appLanguage];
  // ---- Language End ----

});
