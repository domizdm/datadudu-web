'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('MainCtrl', function ($scope, $route, $window, Auth) {
  // 只在加载时记录下登陆状态, sign in/out时强制页面重载
  $scope.isLoggedIn = Auth.isLoggedIn();

  $scope.logout = function() {
    Auth.logout();

    $window.location.reload();
  };

  $scope.login = function() {
    Auth.login('wangmao', 'wangmao');

    // we should reload page to trigger AdminLTE re-layout
    $window.location.reload();
  };

});
