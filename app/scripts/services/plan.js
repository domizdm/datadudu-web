'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.plan
 * @description
 * # product
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('plan', function ($resource, config) {
  return $resource(config.END_POINT+'/:controller/:_action/:item/:id', {
    id: '@_id',
    controller: 'plan'
  },{
    /**
     * 查看所有Pricing Plans（内部接口）

     To share a list of channels to someone, send an HTTP GET of JSON to http://api.datadudu.cn/plan/list


     Valid request parameters:
     公开访问
     */
    list: {
      method: 'GET',
      params: {
        _action: 'list'
      }
    }

  });
});
