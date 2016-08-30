'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
  .controller('PaymentCtrl', function ($scope, $log, $localStorage, $http, channel) {
    $localStorage.lang="zh-CN";
//            var code=getUrlParameter("code");
    $scope.channels = null;
    console.log($localStorage.me);
    var account=$localStorage.me.account;
    $scope.username=account.username;
      //console.log($scope.username);

//    var code = "<?= $code ?>";
//    var url = 'http://api.datadudu.cn/accounts/login_wechat?code=' + code;
//    var httpRequest = $http({
//      method: 'POST',
//      url: url
//    }).then(function successCallback(response) {
//      // this callback will be called asynchronously
//      // when the response is available
////                    alert(response);
//      console.log(response.data);
//      $localStorage.me = response.data;
//
//    }, function errorCallback(response) {
//      // called asynchronously if an error occurs
//      // or server returns response with an error status.
//      //console.log(response);
//    });



  });
