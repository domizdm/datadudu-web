'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelUploadIconCtrl
 * @description
 * # ChannelUploadIconCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelUploadIconCtrl', function($scope, $q, $filter, $window, $timeout, $log,
                                             config, $uibModal, $uibModalInstance, Upload, ngNotify,
                                             channel, channelId){

  $scope.channel_icon = null;
  $scope.form = {};
  $scope.uploading = false;
  $scope.percentage = 0;

  var uploader = null;

  $scope.upload = function (file, form) {

    if(!file) {
      ngNotify.set('No image file selected.', 'error');
      return;
    }

    var payload = _.extend({}, form);

    $scope.percentage = 0;
    $scope.uploading = true;

    uploader = Upload.upload({
      url: config.END_POINT + '/channels/' + channelId + '/upload_icon',
      params: {_json: true},// =dont transform into jqlike
      data: _.extend(payload, {'channel_icon': file})
    });

    uploader.then(function (resp) {

      $uibModalInstance.close(form);

      ngNotify.set('New icon uploaded.', 'success');

    }, function (resp) {
      if(resp.data != null) {
        ngNotify.set(resp.data, 'error');
      }
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      $scope.percentage = progressPercentage;
    }).finally(function(){
      $scope.uploading = false;
    });
  };


  // TODO: abort upload when dismiss
  // upload.abort()


  //$scope.fields = [{key:'status', text:'Status'}];
  //$scope.fields = _.concat($scope.fields, _.map(fields,
  //  function(v){
  //    var ret = {key: v.key};
  //    ret.text=['[',v.key,'] ', v.text].join('');
  //    return ret;
  //  }
  //));
  //
  //$scope.types = [
  //  {key: 'numeric', text:'Numeric'},
  //  {key: 'string', text:'String'},
  //  {key: 'no_data_check', text:'No Data Check'}
  //];
  //$scope.acttion_freqs = [
  //  {key: 'change_only', text:'Change Only'},
  //  {key: 'always', text:'Always'}
  //];
  //$scope.action_types = [
  //  {key: 'email', text:'Email'},
  //  {key: 'sms', text:'Sms'},
  //  {key: 'http', text:'Http'},
  //  {key: 'command', text:'Command'}
  //];
  //$scope.frequencies = [
  //  {key:'300',text:'5 Minutes'},
  //  {key:'600',text:'10 Minutes'},
  //  {key:'1800',text:'30 Minutes'},
  //  {key:'3600',text:'1 Hour'}
  //];
  //
  //$scope.criterias = {
  //  'numeric': [
  //    {key: '>', text:'>'},
  //    {key: '>=', text:'>='},
  //    {key: '<', text:'<'},
  //    {key: '<=', text:'<='},
  //    {key: '==', text:'=='},
  //    {key: '!=', text:'!='},
  //  ],
  //  'string': [
  //    {key: 'contains', text:'contains'},
  //    {key: 'starts_with', text:'starts with'},
  //    {key: 'ends_with', text:'ends with'},
  //    {key: 'equal', text:'equal'},
  //    {key: 'not_equal', text:'not equal'},
  //    {key: 'equal_ignore_case', text:'equal ignore case'},
  //  ],
  //  'no_data_check': [
  //  ]
  //};
  //
  //$scope.form = {
  //  created_at: new Date(),
  //
  //  rule_id: rule ? rule.rule_id : null,
  //  rule_name: rule ? rule.rule_name : '',
  //  field: rule ? _.find($scope.fields, {key:rule.field}) : $scope.fields[0],
  //  type: rule ? _.find($scope.types, {key:rule.type}) : $scope.types[0],
  //  action_type: rule ? _.find($scope.action_types, {key:rule.action_type}) : $scope.action_types[0],
  //  action_value: rule ? rule.action_value : '',
  //  action_frequency: rule ? _.find($scope.acttion_freqs, {key:rule.action_frequency}) : $scope.acttion_freqs[0],
  //  action_sub_value: rule ? rule.action_sub_value : '',
  //  criteria: rule ? _.find($scope.criterias[rule.type], {key:rule.criteria}) : null,
  //  condition: rule ? rule.condition : '',
  //  // if not found, means it's a corrupt data, fall back to default 0
  //  frequency: rule ? (_.find($scope.frequencies, {key:rule.frequency}) || $scope.frequencies[0]) : $scope.frequencies[0],
  //};
  //
  //
  //$scope.ok = function () {
  //  var form =
  //    {
  //      rule_id: $scope.form.rule_id,
  //      action_type: $scope.form.action_type ? $scope.form.action_type.key : null,
  //      action_value: $scope.form.action_value,
  //      action_sub_value: $scope.form.action_sub_value,
  //      rule_name: $scope.form.rule_name,
  //      field: $scope.form.field ? $scope.form.field.key : null,
  //      type: $scope.form.type ? $scope.form.type.key : null,
  //      action_frequency: $scope.form.action_frequency ? $scope.form.action_frequency.key : null,
  //      criteria: $scope.form.criteria ? $scope.form.criteria.key : null,
  //      condition: $scope.form.condition,
  //      frequency: $scope.form.frequency ? $scope.form.frequency.key : null
  //    };
  //
  //  if(form.rule_id != null) {// add new rule
  //    channel.updateRule(_.extend({id:channelId, type_id:form.rule_id}), form)
  //      .$promise
  //      .then(function(resp){
  //        $uibModalInstance.close(form);
  //        ngNotify.set('Rule updated.', 'success');
  //      })
  //      .catch(function(err){
  //        // TODO: more error info
  //        ngNotify.set(err.data.desp || err.statusText, 'error');
  //      });
  //  }else{// update rule
  //    channel.addRule({id:channelId}, form)
  //      .$promise
  //      .then(function(resp){
  //        $uibModalInstance.close(form);
  //        ngNotify.set('Rule added.', 'success');
  //      })
  //      .catch(function(err){
  //        // TODO: more error info
  //        ngNotify.set(err.data.desp || err.statusText, 'error');
  //      });
  //  }
  //};

  $scope.cancel = function () {
    if(uploader != null && Upload.isUploadInProgress()) {

      $log.log(uploader);

      uploader.abort();

      ngNotify.set('Icon upload has been aborted.', 'error');
    }

    $uibModalInstance.dismiss('cancel');
  };
});
