'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ConsumerDetailsCtrl
 * @description
 * # ConsumerDetailsCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ConsumerDetailsCtrl', function ($scope,  $log, $filter, finance, Auth, $timeout, ngNotify ) {

  $(function () {
    $('#date_from').datetimepicker();
    $('#date_to').datetimepicker();
    $("#date_from").on("dp.change",function (e) {
      $('#date_to').data("DateTimePicker").minDate(e.date);
    });
    $("#date_to").on("dp.change",function (e) {
      $('#date_from').data("DateTimePicker").maxDate(e.date);
    });
  });

//  var abc = $http({method:"GET", url:"http://api.datadudu.cn/accounts/view"}).
//  success(function(data, status, headers, config){
//    //当异步请求成功返回响应时触发
//  }).error(function(data, status, headers, config){
//    //当发生异常时触发
//  });
//console.log(abc);

  var ctrl = this;
  $scope.mc = this;
  this.displayed = [];

  this.callServer = function callServer(tableState) {

    ctrl.tableState = tableState || ctrl.tableState;
    ctrl.isLoading = true;

    var pagination = tableState.pagination;
    console.log(tableState.pagination);

    var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
    var number = pagination.number || 10;  // Number of entries showed per page.

    var pageNumber = Math.floor(start / number);

    var params = {itemsPerPage:number,pageNumber:pageNumber};

    if(tableState.sort.predicate){
      params.orderItem = tableState.sort.predicate;
      params.orderType = tableState.sort.reverse ? 'ASC' : 'DESC';
    }

    // set timeout 1000 for debug test
    $timeout(function(){
      finance.list(params)

        .$promise
        .then(function(resp){
          //console.log(resp);
          var itemsPerPage = resp.itemsPerPage;
          var totalItems = resp.totalItems;
          //console.log(itemsPerPage);
          //console.log(totalItems);

          var numberOfPages = Math.ceil(totalItems / itemsPerPage);

          if(isNaN(numberOfPages)) numberOfPages = 0;

          ctrl.displayed = resp.transactions;

          tableState.pagination.numberOfPages = numberOfPages;//set the number of pages so the pagination can update
          //console.log(numberOfPages);
          ctrl.isLoading = false;
        })
        .catch(function(err){
          ngNotify.set(err.data.desp || err.statusText, 'error');
        });
    }, 0);

  };


});
