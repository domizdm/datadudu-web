'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('MainCtrl', function ($rootScope, $route, $routeParams, $log, $window, Auth, $scope, $location, config, moment, langTrans) {
  // 只在加载时记录下登陆状态, sign in/out时强制页面重载

  $scope.isLoggedIn = Auth.isLoggedIn();
  $scope.username = Auth.username();
  $scope.routeParams = $routeParams;
  $scope.itemsByPage = 6;

  // explode a language translation API
  $rootScope.T = langTrans.T;

  // ----- Language Begin ----
  // TODO: it should be loaded from user profile or cookie?
  $scope.appLanguage = Auth.language();
  $scope.onChangeLanguage = function(lang){
    $scope.appLanguage = Auth.language(lang);

    $window.location.reload();// reload through $window coz login is not in route
  };

  $rootScope.Lang = config.lang[$scope.appLanguage];
  // ---- Language End ----


  $scope.loginForm = {
    username: '',
    password: '',
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
        //$scope.loginForm.message = (err && err.data && err.data.desp) || 'Unknown error';
        //$scope.loginForm.message = "登录名或登录密码不正确" || 'Unknown error';

        //var errResp = $.parseJSON(err.responseText);

        switch (err.errorCode) {
          case 'permission_denied':
            $scope.loginForm.message = (err && err.data && err.data.desp) || 'Unknown error';break;
          case 'account_require_verify':
            $scope.loginForm.message = "邮件未验证！" || 'Unknown error';break;
  }

});
};

$scope.logout = function() {
    Auth.logout();

    $window.location.reload();
  };

  // for debug
  $scope.printMe = function() {
    Auth.print();
  };

  $scope.reload = function(){
    $route.reload();
  };

  // set up platform title
  if(config.USE_DEVICE_DASHBOARD) {
    angular.element('head>title').text('轻松连智能硬件控制面板');
  }else{
    angular.element('head>title').text('轻松连大数据管理控制台（专业版）');
  }

  //$scope.getCurrentTitle = function(){
  //  if(/channels/.test($location.path)){
  //
  //    return 'test'
  //  }
  //};

});
