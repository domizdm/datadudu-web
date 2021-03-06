'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('MainCtrl', function ($rootScope, $route, $routeParams, $log, $window, Auth, $scope, $location, config,
                                  moment, langTrans ,ngNotify, finance, $filter, $timeout) {
  // 只在加载时记录下登陆状态, sign in/out时强制页面重载
  $scope.LOADING = false;
  $scope.ShowLoading = function() {
    $scope.LOADING = !$scope.LOADING;
  };

  $scope.isLoggedIn = Auth.isLoggedIn();
  $scope.username = Auth.username();
  $scope.routeParams = $routeParams;
  $scope.itemsByPage = 10;//6

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
        $scope.LOADING = true;

      })
      .catch(function(err){
        // show login failed message
        //$scope.loginForm.message = (err && err.data && err.data.desp) || 'Unknown error';
        var errInformation = err.data;
        switch (errInformation.errorCode) {
          case "permission_denied":
            $scope.loginForm.message = "登录名或密码不正确!" ;break;
          case "account_require_verify":
            $scope.loginForm.message = "邮件未验证！" ;break;
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

  //$rootScope.refresh = function () {
  //  account.me()
  //    .$promise
  //    .then(function (resp) {
  //      $rootScope.accountBalance = resp.account.balance;
  //      ngNotify.set('余额已刷新！' ,'success');
  //    }).catch(function (err) {
  //
  //
  //  });
  //};

  $scope.$on('ubibot::updateAccount', function(){
    Auth.rebind()
      .then(function(resp){
        updateBalance(resp.account);
      });
  });

  $rootScope.refresh = function (flag) {

    var tempFlag =  flag === undefined?true:false;

    Auth.rebind()
      .then(function(resp){
        updateBalance(resp.account);

        if (tempFlag){
          ngNotify.set('余额已刷新！' ,'success');
        }
      });
  };

  $rootScope.refresh(false);

  function updateBalance(account) {
    $rootScope.accountBalance = account.balance;
  }

});
