'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.RequestNormalizeInterceptor
 * @description
 * # RequestNormalizeInterceptor
 * Factory in the dataduduR3App.
 */
angular.module('dataduduR3App')
.factory('RequestNormalizeInterceptor', function ($httpParamSerializerJQLike) {
  return {
    request: function(config) {
      if(/post/i.test(config.method)) {
        config.data = $httpParamSerializerJQLike(config.data);
      }
      return config;
    }
  };
});
