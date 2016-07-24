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
      return $q(function(resolve, reject){
        var payload =  {username: username, password:password};

        return account.login(null, payload)
          .$promise
          .then(function(resp){
            $localStorage.me = resp;
            resolve(resp);
          })
          .catch(function(err){
            reject(err);
          });
      });
    },
    /**
     * update account info from server
     * @returns {*}
       */
    rebind: function(){
      return $q(function(resolve, reject){
        return account.me(null, null)
          .$promise
          .then(function(resp){
            $localStorage.me.account = resp.account;
            resolve(resp);
          })
          .catch(function(err){
            reject(err);
          });
      });
    },
    print: function() {// for debug
      $log.log($localStorage.me);
    },
    language: function(lang){// setter and getter for language
      var defaultLang = 'en-GB';

      if(!lang) {
        lang = $localStorage.lang ? $localStorage.lang : defaultLang;
      }

      $localStorage.lang = lang;
      return lang;
    },
    me: function() {
      return $localStorage.me;
    },
    tokenId: function() {
      return $localStorage.me ? $localStorage.me.token_id : null;
    },
    username: function() {
      return $localStorage.me && $localStorage.me.account ? $localStorage.me.account.username : null;
    },
    logout: function() {
      delete $localStorage.me;
    },
    isLoggedIn: function() {
      return !!$localStorage.me;
    },
    isLoggedInAsync: function() {
      return $q(function(resolve, reject){
        var query =  {'token_id': ($localStorage.me ? $localStorage.me.token_id : null)};

        account.me(query)
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
