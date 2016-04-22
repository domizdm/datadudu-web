'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('MainCtrl', function ($route, $log, $window, Auth, $scope) {
  // 只在加载时记录下登陆状态, sign in/out时强制页面重载
  $scope.isLoggedIn = Auth.isLoggedIn();
  $scope.itemsByPage = 10;

  $scope.login = function() {
    Auth.login('wangmao', 'wangmao')
      .then(function(){
        // we should reload page to trigger AdminLTE re-layout
        $window.location.reload();
      })
      .catch(function(err){
        // TODO: show login failed message
        $log.log(err);
      });
  };

  $scope.logout = function() {
    Auth.logout();

    $window.location.reload();
  };

});
