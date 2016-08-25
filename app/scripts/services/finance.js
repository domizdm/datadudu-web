'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.trigger
 * @description
 * # trigger
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('finance', function ($resource, config) {

  return $resource(config.END_POINT+'/:controller/:_action/:item/:id/:_type/:type_id/:_extra_1', {
    id: '@_id',
    controller: 'finance',
    _action:'transactions'
  },{
    /**
     * List All My Product Batch

     To view a product batch, send HTTP GET to http://api.datadudu.cn/products


     Valid request parameters:
     account_key or token_id (string) –account_key  or token_id for internal use, obtained through login API.
     */
    list: {
      method: 'GET',
      _json: true
    }

  });
});
