'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsEditRuleCtrl
 * @description
 * # ChannelsEditRuleCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsEditRuleCtrl', function($scope, $q, $filter, $window, $timeout, $log,
                                             config, $uibModal, $uibModalInstance, ngNotify,
                                             channel, fields, channelId, rule){


  $scope.fields = [{key:'status', text:'Status'}];
  $scope.fields = _.concat($scope.fields, _.map(fields,
    function(v){
      var ret = {key: v.key};
      ret.text=['[',v.key,'] ', v.text].join('');
      return ret;
    }
  ));

  $scope.types = [
    {key: 'numeric', text:'Numeric'},
    {key: 'string', text:'String'},
    {key: 'no_data_check', text:'No Data Check'}
  ];
  $scope.acttion_freqs = [
    {key: 'change_only', text:'Change Only'},
    {key: 'always', text:'Always'}
  ];
  $scope.action_types = [
    {key: 'email', text:'Email'},
    {key: 'sms', text:'Sms'},
    {key: 'http', text:'Http'}
  ];

  $scope.criterias = {
    'numeric': [
      {key: '>', text:'>'},
      {key: '>=', text:'>='},
      {key: '<', text:'<'},
      {key: '<=', text:'<='},
      {key: '==', text:'=='},
      {key: '!=', text:'!='},
    ],
    'string': [
      {key: 'contains', text:'contains'},
      {key: 'starts_with', text:'starts with'},
      {key: 'ends_with', text:'ends with'},
      {key: 'equal', text:'equal'},
      {key: 'not_equal', text:'not equal'},
      {key: 'equal_ignore_case', text:'equal ignore case'},
    ],
    'no_data_check': [
    ]
  };

  $scope.form = {
    created_at: new Date(),

    rule_id: rule ? rule.rule_id : null,
    rule_name: rule ? rule.rule_name : '',
    field: rule ? _.find($scope.fields, {key:rule.field}) : $scope.fields[0],
    type: rule ? _.find($scope.types, {key:rule.type}) : $scope.types[0],
    action_type: rule ? _.find($scope.action_types, {key:rule.action_type}) : $scope.action_types[0],
    action_value: rule ? rule.action_value : '',
    action_frequency: rule ? _.find($scope.acttion_freqs, {key:rule.action_frequency}) : $scope.acttion_freqs[0],
    criteria: rule ? _.find($scope.criterias[rule.type], {key:rule.criteria}) : null,
    condition: rule ? rule.condition : '',
    frequency: rule ? parseFloat(rule.frequency) : 0
  };



  $scope.ok = function () {
    var form =
      {
        rule_id: $scope.form.rule_id,
        action_type: $scope.form.action_type ? $scope.form.action_type.key : null,
        action_value: $scope.form.action_value,
        rule_name: $scope.form.rule_name,
        field: $scope.form.field ? $scope.form.field.key : null,
        type: $scope.form.type ? $scope.form.type.key : null,
        action_frequency: $scope.form.action_frequency ? $scope.form.action_frequency.key : null,
        criteria: $scope.form.criteria ? $scope.form.criteria.key : null,
        condition: $scope.form.condition,
        frequency: $scope.form.frequency || 0
      };

    if(form.rule_id != null) {// add new rule
      channel.updateRule(_.extend({id:channelId, type_id:form.rule_id}), form)
        .$promise
        .then(function(resp){
          $uibModalInstance.close(form);
          ngNotify.set('Rule updated.', 'success');
        })
        .catch(function(err){
          // TODO: more error info
          ngNotify.set(err.data.desp || err.statusText, 'error');
        });
    }else{// update rule
      channel.addRule({id:channelId}, form)
        .$promise
        .then(function(resp){
          $uibModalInstance.close(form);
          ngNotify.set('Rule added.', 'success');
        })
        .catch(function(err){
          // TODO: more error info
          ngNotify.set(err.data.desp || err.statusText, 'error');
        });
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
