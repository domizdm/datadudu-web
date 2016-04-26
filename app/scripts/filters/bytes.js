'use strict';

/**
 * @ngdoc filter
 * @name dataduduR3App.filter:bytes
 * @function
 * @description
 * # bytes
 * Filter in the dataduduR3App.
 */
angular.module('dataduduR3App')
.filter('bytes', function() {
  return function(bytes, precision) {
    if (isNaN(parseFloat(bytes)) || !isFinite(bytes) || 0===parseFloat(bytes)) { return '-'; }
    if (typeof precision === 'undefined') { precision = 1; }
    var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
      number = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
  };
});
