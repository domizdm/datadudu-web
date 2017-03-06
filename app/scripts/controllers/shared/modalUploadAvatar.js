'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:UploadAvatarCtrl
 * @description
 * # UploadAvatarCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('UploadAvatarCtrl', function($scope, $q, $filter, $window, $timeout, $log,Auth,
                                             config, $uibModal, $uibModalInstance, Upload, ngNotify,
                                             account, account_key){

  $scope.avatarFile = null;
  $scope.form = {};
  $scope.uploading = false;
  $scope.percentage = 0;
  $scope.maxSize = '5MB';//MB

  var uploader = null;

  $scope.upload = function (file, form) {

    if(!file) {
      ngNotify.set('No image file chosen!', 'error');
      return;
    }

    var payload = _.extend({}, form);

    $scope.percentage = 0;
    $scope.uploading = true;

    uploader = Upload.upload({
      url: config.END_POINT + '/accounts/upload_avatar',
      params: {_json: true},// =dont transform into jqlike
      data: _.extend(payload, {'avatar': file})
    });

    uploader.then(function (resp) {

      $uibModalInstance.close(form);

      ngNotify.set('Avatar has been updated.', 'success');

    }, function (resp) {
      if(resp.data != null) {
        ngNotify.set(resp.data.desp, 'error');
      }
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      $scope.percentage = progressPercentage;
    }).finally(function(){
      $scope.uploading = false;
    });
  };

  $scope.cancel = function () {
    if(uploader != null && Upload.isUploadInProgress()) {

      $log.log(uploader);

      uploader.abort();

      ngNotify.set('Icon upload has been aborted.', 'error');
    }

    $uibModalInstance.dismiss('cancel');
  };
});
