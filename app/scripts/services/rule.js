'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.duduHttp
 * @description
 * # duduHttp
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('rule', function ($resource, config) {
  return $resource(config.END_POINT+'/:controller/:_action/:item/:id/:_type/:type_id', {
    id: '@_id',
    controller: 'rules'
  },{
    /**
     * List All Rules under account

     To add a channel rule, send an HTTP GET to http://api.datadudu.cn/rules

     Valid request parameters:
     account_key or token_id (string) – account_key is Read or Write key for this specific channel (no key required for public channels) or token_id for internal use, obtained through login API. (required)
     pageNumber (string): page number for the request (optional)
     itemsPerPage (string): number of items page page (optional)
     */
    list: {
      method: 'GET'
    },
    toggleRuleStatus: {
      method: 'POST',
      params: {
        _action: 'toggle'
      }
    }
  });
});
