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
  return $resource(config.END_POINT+'/:controller/:_action/:item', {
    controller: 'accounts'
  },{
    /**
     *
     username, password, email, timezone
     */
    create: {
      method: 'POST',
      params: {
        _action: 'create'
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
        _action: 'login'
      }
    },
    /**
     * account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     */
    me: {
      method: 'GET',
      params: {
        _action: 'view'
      }
    },
    /**
     * Search User by user or user_id

     To search user accounts, send an HTTP GET to http://api.datadudu.cn/accounts/search

     Valid request parameters:
     account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     username (string) or user_id (string): (required) : search by username (minimum 3 characters needed)  or search by user_id, user_id must be full length and correct.
     */
    search: {
      method: 'GET',
      params: {
        _action: 'search'
      }
    },
    /**
     * Timezone Information

     To Get the List of Timezones:
     http://api.datadudu.cn/constants/timezones
     */
    timezones: {
      method: 'GET',
      params: {
        controller: 'constants',
        _action: 'timezones'
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
        _action: 'update'
      }
    },
    /**
     * Update User Account (Internal)

     To update a user, send an HTTP POST to http://api.datadudu.cn/accounts/update


     JSON Body FIELDS:
     user_id: current user_id, it can be obtained from login token request or Account View APIs (required)
     username: new username to change (optional)
     password: current password (required)
     new_password: new password if to change(optional)
     email: new email address to change (optional)
     timezone: new timezone to change (optional)


     Example Body:

     {"username":"abc","password":"123","email":"123@gmail.com", “timezone”: “Europe/London”, "captcha_code":""}

     Captcha Image URL: http://api.datadudu.cn/accounts/captcha

     Response:
     {"result":"success","user":{"username":"scdcd","email":"asdf@dfd.cddddom","account_key":"d9b4cb5cf9be1324380817232aaef9ed"}}
     account_key is used for managing channels through the API.
     */
    updateAccount: {
      method: 'POST',
      params: {
        _action: 'update',
        _json: true
      }
    },
    /**
     * Update User Public Profile (Internal)

     To update a user, send an HTTP POST to http://api.datadudu.cn/accounts/update/public
     Valid request parameters:
     account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     callback


     JSON Body FIELDS:
     website: website URL (optional)
     bio: bio information (optional)
     public_flag: whether to make profile public (optional)
     */
    updateProfile: {
      method: 'POST',
      params: {
        _action: 'update',
        item: 'public',
        _json: true
      }
    },
    /**
     * Generate New ACCOUNT KEY

     To generate and replace the account_key of the user account, send GET/POST request to http://api.datadudu.cn/accounts/api_keys?action=generate_account_key

     Valid request parameters:
     action=generate_account_key
     account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     */
    generateAccountKey: {
      method: 'POST',
      params: {
        _action: 'api_keys',
        action: 'generate_account_key',
        _json: true
      }
    }
  });
});
