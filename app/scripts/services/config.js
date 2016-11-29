'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.config
 * @description
 * # config
 * Value in the dataduduR3App.
 */

var __config = {
  END_POINT: 'http://api.ubibot.cn',
  END_POINT_PAYMENT: 'http://console.ubibot.cn',
  USE_DEVICE_DASHBOARD: false,
  DEFAULT_LANG: 'zh-CN',// en-GB, zh-CN
  lang: {}
};

angular.module('dataduduR3App')
  .value('config', __config);
