/**
 * Created by gorebill on 2/24/17.
 */
angular.module('dataduduR3App')
.filter('paidState', function($sce) {
  return function (input) {
    if(!input) return '-';

    if(/paid/i.test(input)) {
      return $sce.trustAsHtml('<span class="text-primary">已支付</span>');
    }else if(/pending/i.test(input)) {
      return $sce.trustAsHtml('<span class="text-danger">待支付</span>');
    }
    return input;
  };
});
