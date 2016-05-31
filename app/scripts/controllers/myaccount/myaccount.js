'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:MyAccountCtrl
 * @description
 * # MyAccountCtrl
 * Controller of the dataduduR3App
 */

angular.module('dataduduR3App')
  .controller('MyAccountCtrl', function($scope, $q, $filter, $window, $timeout, $log,$http,
                                              $httpParamSerializer, config, $uibModal, ngNotify, account){

    //$scope.channels = null;
    //$scope.accountData=null;
    account.me()
      .$promise
      .then(function(resp){
        $scope.accountData = resp.account;
        //console.log($scope.accountData);
        //alert($scope.accountData);
        //$scope.channels = resp.channels;
      })

      .catch(function(err){

        // TODO: show error message
        $log.log(err);
      })

    ;
    $scope.testThis=function()
    {
      alert("test");
    };
  /*  $http({
      method:'POST',
      url   :'http://api.datadudu.cn/accounts/view?token_id=51e9989218714e679cd07465f1252f1a',
      data  : $.param($scope.formData),
      headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    })

      .success(function(data){
        if (data.success){
          myfactory.savCampusSess().success(function(data){
            if (data.status<0)
              alert(data.error);
          });

          var info="welcome!"+data.uidd+"名用户";
          alert(info);
          $state.go('pensoncenter');
        }
        else {
          $scope.errorphone=data.errors.phone;
          $scope.errorpin=data.errors.pin;
        }
        $scope.message=data.message;
      });*/


  });
