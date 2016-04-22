'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.AuthorizationInterceptor
 * @description
 * # AuthorizationInterceptor
 * Factory in the dataduduR3App.
 */
angular.module('dataduduR3App')
.factory('AuthorizationInterceptor', function ($q, $log, $localStorage) {
  // Service logic
  // ...
  return {
    request: function(config) {
      if($localStorage.me) {
        config.params = config.params ? config.params : {};
        config.params.token_id = $localStorage.me.token_id;
      }

      return config;
    },
    response: function(config) {
      return config;
    },
    responseError: function(response) {
      if(response.status === 400) {
        $log.log(response);
      }

      return $q.reject(response);
    }
  };
});
