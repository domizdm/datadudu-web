'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsAddPointCtrl
 * @description
 * # ChannelsAddPointCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsAddPointCtrl', function($scope, $q, $filter, $window, $timeout, $log,
                                             config, $uibModal, $uibModalInstance, ngNotify,
                                             feed, fields, writeKey){


  $scope.fields = fields;
  $scope.form = {
    created_at: new Date()
  };

  $scope.ok = function () {
    var form = _.extend({api_key: writeKey}, $scope.form);

    var timezone = 'GMT+08:00';
    var serverFormat = 'yyyy-MM-dd HH:mm:ss';
    var createdAt = new Date(form.created_at);
    form.created_at = $filter('date')(createdAt, serverFormat, timezone);

    feed.addFeed(null, form)
      .$promise
      .then(function(resp){
        $uibModalInstance.close(form);
        ngNotify.set('Point added.', 'success');
      })
      .catch(function(err){
        // TODO: more error info
        ngNotify.set(err.statusText, 'error');
      });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
