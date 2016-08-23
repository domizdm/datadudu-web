'use strict';

/**
 * @ngdoc directive
 * @name dataduduR3App.directive:datetimepicker
 * @description
 * # datetimepicker
 */
angular.module('dataduduR3App')
.directive('datetimepicker', function ($log, $timeout, moment) {
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
        ignoreReadonly: true,
        useCurrent:false
      });

      if(scope.datetime) {
        datetimepicker.data('DateTimePicker').date(scope.datetime);
      }else{
        // FIXME: 不设的话会变为UTC+0
        datetimepicker.data('DateTimePicker').date(new Date());
      }

      scope.$watch(function(){
        return scope.datetime;
      }, function(newValue){
        if(newValue) {
          $timeout(function(){
            var dp = datetimepicker.data('DateTimePicker');
            if(dp) {
              dp.date(new Date(newValue));
            }
          });
        }
      });

      element.on('dp.change', function (e) {
        scope.$apply(function(){
          scope.datetime = new Date(e.date);
        });
      });
    }
  };
});
