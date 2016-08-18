'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:DuduHttpEditCtrl
 * @description
 * # DuduHttpEditCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('DuduHttpEditCtrl', function ($scope, $log, $location, $routeParams, ngNotify, Auth, duduHttp) {

  $scope.pageTitle = 'Edit DuduHTTP';

  $scope.httpMethods = [
    {key:'GET', text:'GET'},
    {key:'POST', text:'POST'},
    {key:'PUT', text:'PUT'},
    {key:'DELETE', text:'DELETE'}
  ];

  $scope.httpVersions = [
    {key: '1.1', text:'1.1'}
  ];

  $scope.form = {};

  $scope.addNewHeader = function() {
    $scope.form.headers.push({name:'',value:''});
  };

  $scope.removeHeader = function(index) {
    $scope.form.headers.splice(index, 1);
  };




  $scope.loadDataHttp = function(){
    duduHttp.get({id: $routeParams.dudu_http_id})
      .$promise
      .then(function(resp){
        var data = resp.duduhttp;

        // coz server returns a string text for headers, it should be parsed manually
        try{
          data.headers = JSON.parse(data.headers);
        }catch(e){
          data.headers = [];

          $log.log('Can not parse headers. Fall back as empty array.');
        }

        $scope.form = data;
      })
      .catch(function(){

      });
  };
  $scope.loadDataHttp();

  $scope.saveDuduHttp = function(form){
    duduHttp.updateDuduHttp({id:form.http_id}, form)
      .$promise
      .then(function(resp){
        $location.path('/duduHttp');
        ngNotify.set(Auth.L('duduHttp.duduHttp-updated'), 'success');
      })
      .catch(function(err){
        // TODO: more error info
        ngNotify.set(err.data.desp || err.statusText, 'error');
      });
  };
});
