'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:PaginationLocaleCtrl
 * @description
 * # PaginationLocaleCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('PaginationLocaleCtrl', function($scope, $log, Auth, config){

  // ----- Language Begin ----
  $scope.appLanguage = Auth.language();
  $scope.Lang = config.lang[$scope.appLanguage];
  // ---- Language End ----

});
