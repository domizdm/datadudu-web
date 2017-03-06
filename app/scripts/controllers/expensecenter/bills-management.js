'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:BillsManagementCtrl
 * @description
 * # BillsManagementCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('BillsManagementCtrl', function ($scope, $window, $interval, $log, $uibModal, $location,
                                             $localStorage, $http, $timeout,
                                             $routeParams, ngNotify, config, Auth, payment, plan, channel) {


  var ctrl = this;
  $scope.mc = this;

  var today = new Date(),
    beginDay = new Date();
  beginDay.setYear(today.getYear() - 1);
  $scope.query = {
    channel_id: null,
    begin: beginDay,
    end: today
  };

  $scope.channelsResource = channel.list();

  $scope.reload = function() {
    ctrl.callServer(ctrl.tableState);
  };

  $scope.exportData = function() {
    $log.log('pending');
  };

  $scope.chooseChannel = function(channel_id) {
    $scope.query.channel_id = channel_id;
    $scope.reload();
  };

  this.displayed = [];

  this.callServer = function callServer(tableState) {

    ctrl.tableState = tableState || ctrl.tableState;
    ctrl.isLoading = true;

    var pagination = tableState.pagination;

    var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
    var number = pagination.number || 10;  // Number of entries showed per page.

    var pageNumber = Math.floor(start / number);

    var params = {
      channel_id: $scope.query.channel_id,
      itemsPerPage:number,
      pageNumber:pageNumber
    };

    // TAG: additional query parameters -->
    if($scope.query.begin && !isNaN($scope.query.begin)) {
      params['bill_start'] = $scope.query.begin.getTime();
      params['bill_start'] = Math.ceil(params['bill_start'] / 1000);
    }

    if($scope.query.end && !isNaN($scope.query.end)) {
      params['bill_end'] = $scope.query.end.getTime();
      params['bill_end'] = Math.ceil(params['bill_end'] / 1000);
    }
    // TAG: <-- additional query parameters

    if(tableState.sort.predicate){
      params.orderItem = tableState.sort.predicate;
      params.orderType = tableState.sort.reverse ? 'DESC' : 'ASC';
    };

    // set timeout 1000 for debug test
    $timeout(function(){
      plan.listBills(params)
        .$promise
        .then(function(resp){
          var itemsPerPage = resp.itemsPerPage;
          var totalItems = resp.totalItems;

          var numberOfPages = Math.ceil(totalItems / itemsPerPage);
          if(isNaN(numberOfPages)) numberOfPages = 0;

          ctrl.displayed = resp.bills;
          tableState.pagination.numberOfPages = numberOfPages;//set the number of pages so the pagination can update
          ctrl.isLoading = false;
        })
        .catch(function(err){
          ctrl.isLoading = false;
          ngNotify.set(err.data.desp || err.statusText, 'error');
        });
    }, 0);

  };

});
