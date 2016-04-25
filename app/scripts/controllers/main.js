'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('MainCtrl', function ($route, $routeParams, $log, $window, Auth, $scope, $location) {
  // 只在加载时记录下登陆状态, sign in/out时强制页面重载
  $scope.isLoggedIn = Auth.isLoggedIn();
  $scope.username = Auth.username();
  $scope.routeParams = $routeParams;
  $scope.itemsByPage = 10;

  $scope.loginForm = {
    username: 'wangmao',
    password: 'wangmao',
    message: null
  };
  $scope.login = function(form) {
    Auth.login(form.username, form.password)
      .then(function(){
        // we should reload page to trigger AdminLTE re-layout
        $window.location.reload();
      })
      .catch(function(err){
        // show login failed message
        $scope.loginForm.message = (err && err.data && err.data.desp) || 'Unknown error';
      });
  };

  $scope.logout = function() {
    Auth.logout();

    $window.location.reload();
  };

});
