'use strict';

/**
 * @ngdoc directive
 * @name dataduduR3App.directive:imageOnLoad
 * @description
 * # imageOnLoad
 */
angular.module('dataduduR3App')
.directive('imageOnLoad', function ($log) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('load', function() {
        $log.log('image is loaded');
      });
      element.bind('error', function(){
        $log.log('image could not be loaded');
      });
    }
  };
});
