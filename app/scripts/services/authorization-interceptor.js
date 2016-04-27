'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.AuthorizationInterceptor
 * @description
 * # AuthorizationInterceptor
 * Factory in the dataduduR3App.
 */
angular.module('dataduduR3App')
.factory('AuthorizationInterceptor', function ($q, $log, $localStorage, config) {
  return {
    request: function(cfg) {
      if($localStorage.me && cfg.url.indexOf(config.END_POINT)===0) {
        cfg.params = cfg.params ? cfg.params : {};
        cfg.params.token_id = $localStorage.me.token_id;
      }

      return cfg;
    }
    //response: function(cfg) {
    //  return cfg;
    //},
    //responseError: function(response) {
    //  if(response.status === 400) {
    //    $log.log(response);
    //  }
    //
    //  return $q.reject(response);
    //}
  };
});
