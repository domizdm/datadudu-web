'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.config
 * @description
 * # config
 * Value in the dataduduR3App.
 */

var __config = {
  END_POINT: 'http://api.datadudu.cn',
  USE_DEVICE_DASHBOARD: false,
  lang: {}
};

angular.module('dataduduR3App')
  .value('config', __config);
