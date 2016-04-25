'use strict';

/**
 * @ngdoc directive
 * @name dataduduR3App.directive:datetimepicker
 * @description
 * # datetimepicker
 */
angular.module('dataduduR3App')
.directive('datetimepicker', function (moment) {
  return {
    template:
      '<div class="input-group date">' +
        '<input readonly type="text" class="form-control"/>' +// ng-model="myData"
        '<span class="input-group-addon">' +
          '<span class="glyphicon glyphicon-calendar"></span>' +
        '</span>' +
      '</div>',
    restrict: 'A',
    replace: true,
    //bindToController: true,//不要bind,因为model要bi-direct binding
    scope: {
      'datetime': '=datetimepicker'
    },
    link: function postLink(scope, element, attrs, ctrl) {

      // ref: http://eonasdan.github.io/bootstrap-datetimepicker/Options/
      // ref: http://momentjs.com/docs/#/displaying/format/
      var datetimepicker = element.datetimepicker({
        locale: moment.locale(),
        format:'MM/DD/YYYY HH:mm (zzZZ)',
        ignoreReadonly: true
      });
      datetimepicker.data('DateTimePicker').date(new Date());

      element.on('dp.change', function (e) {
        scope.datetime = e.date;
      });
    }
  };
});
