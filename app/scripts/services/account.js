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
  return $resource(config.END_POINT+'/:controller/:action/:item', {
    controller: 'accounts'
  },{
    /**
     *
     username, password, email, timezone
     */
    create: {
      method: 'POST',
      params: {
        action: 'create'
      }
    },
    /**
     *
     username (string) - (required).
     password (string) – (required)
     */
    login: {
      method: 'POST',
      params: {
        action: 'login'
      }
    },
    /**
     * account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     */
    me: {
      method: 'GET',
      params: {
        action: 'view'
      }
    },
    /**
     *
     user_id: current user_id, it can be obtained from login token request or Account View APIs (required)
     username: new username to change (optional)
     password: current password (required)
     new_password: new password if to change(optional)
     email: new email address to change (optional)
     timezone: new timezone to change (optional)
     */
    update: {
      method: 'POST',
      params: {
        action: 'update'
      }
    },
    /**
     *
     account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     callback
     */
    updatePublicProfile: {
      method: 'POST',
      params: {
        action: 'update',
        item: 'public'
      }
    }
  });
});
