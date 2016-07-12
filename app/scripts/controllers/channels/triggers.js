'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsTriggersCtrl
 * @description
 * # ChannelsTriggersCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsTriggersCtrl', function ($scope, $log, $filter, trigger, Auth, $timeout, ngNotify) {

  var ctrl = this;
  $scope.mc = this;

  this.displayed = [];

  this.callServer = function callServer(tableState) {

    ctrl.tableState = tableState || ctrl.tableState;
    ctrl.isLoading = true;

    var pagination = tableState.pagination;

    var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
    var number = pagination.number || 10;  // Number of entries showed per page.

    var pageNumber = Math.floor(start / number);

    var params = {itemsPerPage:number,pageNumber:pageNumber,channel_id:$scope.channel.channel_id};
    //var params = {itemsPerPage:1,pageNumber:pageNumber};

    if(tableState.sort.predicate){
      params.orderItem = tableState.sort.predicate;
      params.orderType = tableState.sort.reverse ? 'ASC' : 'DESC';
    };

    // set timeout 1000 for debug test
    $timeout(function(){
      trigger.list(params)
        .$promise
        .then(function(resp){
          var itemsPerPage = resp.itemsPerPage;
          var totalItems = resp.totalItems;

          var numberOfPages = totalItems / itemsPerPage;
          if(isNaN(numberOfPages)) numberOfPages = 0;

          ctrl.displayed = resp.triggers;
          tableState.pagination.numberOfPages = numberOfPages;//set the number of pages so the pagination can update
          ctrl.isLoading = false;
        })
        .catch(function(err){
          ngNotify.set(err.data.desp || err.statusText, 'error');
        });
    }, 0);

  };

});
