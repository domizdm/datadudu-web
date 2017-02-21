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
    },
    /**
     * 套餐升级变更（内部接口）

     To share a list of channels to someone, send an HTTP GET of JSON to http://api.datadudu.cn/plan/upgrade

     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     channel_id (int): channel_id (optional)
     plan_code: 新套餐编号
     */
    upgrade: {
      method: 'GET',
      params: {
        _action: 'upgrade'
      }
    },
    /**
     * 套餐升级价格查询（内部接口）

     To share a list of channels to someone, send an HTTP GET of JSON to http://api.datadudu.cn/plan/upgrade_quote

     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     channel_id (int): channel_id (optional)
     plan_code: 新套餐编号
     */
    upgradeQuote: {
      method: 'GET',
      params: {
        _action: 'upgrade_quote'
      }
    },
    /**
     * 套餐续费执行（内部接口）

     To share a list of channels to someone, send an HTTP GET of JSON to http://api.datadudu.cn/plan/extend

     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     channel_id (int): channel_id (optional)
     total_cycles (int): 周期数
     */
    extendPlan: {
      method: 'GET',
      params: {
        _action: 'extend'
      }
    }

  });
});
