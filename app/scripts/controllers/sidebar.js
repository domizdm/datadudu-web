'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('SidebarCtrl', function ($scope, config, Auth, $log) {
  $scope.useDeviceDashboard = config.USE_DEVICE_DASHBOARD;
});
