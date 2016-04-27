'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsRulesCtrl
 * @description
 * # ChannelsRulesCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsRulesCtrl', function($scope, $q, $filter, $route, $log, $location,
                                            config, $uibModal, ngNotify, modalConfirm, channel){

  $scope.form = null;

  $scope.$watch('channel', function(newVal){
    if(newVal) {
      $scope.form = _.extend({}, $scope.channel);

    }
  });


});
