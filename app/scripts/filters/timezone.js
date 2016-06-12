'use strict';

/**
 * @ngdoc filter
 * @name dataduduR3App.filter:timezone
 * @function
 * @description
 * # timezone
 * Filter in the dataduduR3App.
 */
angular.module('dataduduR3App')
.filter('timezone', function() {
  return function(timezoneKey, timezoneVal) {
    return ['(', timezoneVal, ')', ' ', timezoneKey].join('');
  };
});
