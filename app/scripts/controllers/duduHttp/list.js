'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:DuduHttpListCtrl
 * @description
 * # DuduHttpListCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('DuduHttpListCtrl', function ($scope, $log, $route, duduHttp, Auth, modalConfirm, ngNotify) {
  $scope.duduhttps = [];

  duduHttp.list()
    .$promise
    .then(function(resp){
      $scope.duduhttps = resp.duduhttps;
    })
    .catch(function(err){
      // TODO: show error message
      $log.log(err);
    });

  $scope.deleteDuduHttp = function(httpId){
    modalConfirm.open('Do you want to delete this dudu http?')
      .then(function(){
        duduHttp.deleteDuduHttp({id:httpId},{})
          .$promise
          .then(function(resp){
            ngNotify.set('DuduHttp deleted', 'success');
            $route.reload();
          })
          .catch(function(err){
            // TODO: more error info
            ngNotify.set(err.data.desp || err.statusText, 'error');
          });
      })
      .catch(function(){
        // do nothing
      });
  };

});
