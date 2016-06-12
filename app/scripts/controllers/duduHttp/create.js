'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsCreateCtrl
 * @description
 * # ChannelsCreateCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('DuduHttpCreateCtrl', function ($scope, $log, $location, ngNotify, Auth, duduHttp) {

  $scope.pageTitle = 'New DuduHTTP';

  $scope.httpMethods = [
    {key:'GET', text:'GET'},
    {key:'POST', text:'POST'},
    {key:'PUT', text:'PUT'},
    {key:'DELETE', text:'DELETE'}
  ];

  $scope.httpVersions = [
    {key: '1.1', text:'1.1'}
  ];

  $scope.form = {
    method: $scope.httpMethods[0].key,
    version: '',//$scope.httpVersions[0].key

    http_name: '',
    url: '',
    auth_username: '',
    auth_password: '',
    content_type: '',
    host: '',
    body: '',
    parse_string: '',
    headers: []
  };

  $scope.addNewHeader = function() {
    $scope.form.headers.push({name:'',value:''});
  };
  $scope.addNewHeader();

  $scope.removeHeader = function(index) {
    $scope.form.headers.splice(index, 1);
  };





  $scope.saveDuduHttp = function(form){
    duduHttp.createDuduHttp(null, form)
      .$promise
      .then(function(resp){
        $location.path('/duduHttp');
        ngNotify.set('DuduHttp created.', 'success');
      })
      .catch(function(err){
        // TODO: more error info
        ngNotify.set(err.data.desp || err.statusText, 'error');
      });
  };
});
