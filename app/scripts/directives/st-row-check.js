'use strict';

/**
 * @ngdoc directive
 * @name dataduduR3App.directive:stRowCheck
 * @description
 * # stRowCheck
 */
angular.module('dataduduR3App')
.directive('stRowCheck', function ($log) {
  return {
    require: '^stTable',
    template: '<input class="datadudu-checkbox" type="checkbox"/>',
    scope: {
      row: '=stRowCheck',
      attr: '=stRowCheckAttr'
    },
    link: function (scope, element, attr, ctrl) {

      // change checked status for this event
      element.bind('change', function (evt) {
        scope.$apply(function () {
          scope.row[scope.attr] = element.find('input').is(':checked');
        });
      });

      // add/remove css for future ui effect
      scope.$watch(function(){
        return scope.row[scope.attr];
      }, function (newValue, oldValue) {
        if (newValue === true) {
          element.find('input').addClass('datadudu-checked');
        } else {
          element.find('input').removeClass('datadudu-checked');
        }
      });
    }
  };
});
