'use strict';

/**
 * langTrans is used for translate page according to localStorage's 'lang' variable.
 *
 * currently en-GB, zh-CH,
 * If lang is en-GB, no lang suffix will be appended. It's a default option.
 *
 * Created by gorebill on 7/25/16.
 */
angular.module('dataduduR3App')
.provider('langTrans', function LangTransProvider($localStorageProvider) {
  /**
   *
   * @param value Page to load without suffix
   * @param suffix Page suffix. eg. html
   * @returns {*}
   * @constructor
     */
  this.T = function(value, suffix) {
    var lang=$localStorageProvider.get('lang');

    var ret = value;
    if(!lang || lang==='en-GB') {
      // do nothing, no appending locale string, use default page
    }else{
      ret += '.' + lang;
    }

    if(suffix) {
      ret += '.' + suffix;
    }else{
      ret += '.html';
    }

    return ret;
  };

  this.$get = [function () {

    // let's assume that the UnicornLauncher constructor was also changed to
    // accept and use the useTinfoilShielding argument
    //return new UnicornLauncher(apiToken, useTinfoilShielding);
    return null;
  }];
});
