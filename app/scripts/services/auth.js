'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.Auth
 * @description
 * # Auth
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('Auth', function ($q, $log, $localStorage, account) {

  return {
    login: function(username, password) {
      $localStorage.me = {
        username: username,
        password: password
      };
    },
    logout: function() {
      delete $localStorage.me;
    },
    isLoggedIn: function() {
      return !!$localStorage.me;
    },
    isLoggedInAsync: function() {
      return $q(function(resolve, reject){
        account.login(null, {
            username:'wangmao',
            password:'wangmao'
          })
          .$promise
          .then(function(){//resp
            resolve(true);
          })
          .catch(function(){//err
            reject(false);
          });
      });
    }
  };
});
