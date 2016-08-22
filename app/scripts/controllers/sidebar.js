'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('SidebarCtrl', function ($scope, config, Auth, $log, $route, $location) {
  $scope.useDeviceDashboard = config.USE_DEVICE_DASHBOARD;

  $scope.activeNodeWhenIn = function(pathList) {
    // 加上try避免浏览器对RegExp的不支持,及null list引起的异常
    try{
      for(var i=0; i<pathList.length; i++) {
        var path = pathList[i];
        var regexp = new RegExp('^/'+path+'(/|\\?|$)', '');
        if(regexp.test($location.path())) {
          return true;
        }
      }
    }catch(e){}

    return false;
  };
});
