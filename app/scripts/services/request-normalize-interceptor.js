'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.RequestNormalizeInterceptor
 * @description
 * # RequestNormalizeInterceptor
 * Factory in the dataduduR3App.
 */
angular.module('dataduduR3App')
.factory('RequestNormalizeInterceptor', function ($httpParamSerializerJQLike, $httpParamSerializer) {
  return {
    request: function(config) {
      if(/post/i.test(config.method)) {
        config.data = $httpParamSerializerJQLike(config.data);
      }
      //if(/put/i.test(config.method)){
      //  config.data = $httpParamSerializer(config.data);
      //}
      return config;
    }
  };
});
