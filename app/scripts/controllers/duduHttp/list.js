'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:DuduHttpListCtrl
 * @description
 * # DuduHttpListCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('DuduHttpListCtrl', function ($scope, $log, duduHttp, Auth) {
  $scope.httpApis = null;

  duduHttp.list()
    .$promise
    .then(function(resp){
      $scope.httpApis = resp.httpApis;
    })

    .catch(function(err){

      // TODO: show error message
      $log.log(err);
    });


});
