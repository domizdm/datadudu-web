'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('HomeCtrl', function ($scope, channel, Auth, $log, $location, config) {

  if(config.USE_DEVICE_DASHBOARD) {
    $location.path('/mydevice');
  }else{
    $location.path('/channels');
  }
});
