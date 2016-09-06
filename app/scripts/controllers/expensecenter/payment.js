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
    $localStorage.lang = "zh-CN";
//  var code=getUrlParameter("code");
    $scope.channels = null;
    //console.log($localStorage.me);
    var account = $localStorage.me.account;
    $scope.username = account.username;
    $scope.DefaultMoney='100';

    //支付过程中打开modal框
    $scope.openModalPayInfo = function(){
      if($scope.channel) {

        channel.listAPIKeys({id:$scope.channel.channel_id})
          .$promise
          .then(function(resp){
            var writeKey = resp.write_key;

            $uibModal.open({
                templateUrl: 'views/expensecenter/particle/modalPayInfo.html',
                controller: '',
                resolve: {
                  fields: function(){
                    return $scope.channelsFields;
                  },
                  writeKey: function(){
                    return writeKey;
                  }
                }
              })
              .result
              .then(function(form){}, function(){/*dismiss*/});
          })
          .catch(function(err){
            ngNotify.set(err.statusText, 'error');
          });
      }
    };

    //console.log($scope.username);
  });
