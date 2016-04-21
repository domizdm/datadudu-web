'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.account
 * @description
 * # account
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('account', function ($resource, config) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  return $resource(config.END_POINT+'/:controller/:action', {
    id: '@_id',
    controller: 'accounts'
  },{
    login: {
      method: 'POST',
      params: {
        action: 'login'
      }
    }
  });
});
