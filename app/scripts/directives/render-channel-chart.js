'use strict';

/**
 * @ngdoc directive
 * @name dataduduR3App.directive:renderChannelChart
 * @description
 * # renderChannelChart
 */
angular.module('dataduduR3App')
.directive('renderChannelChart', function ($log, $timeout) {
  return {
    template: '<div></div>',
    restrict: 'AE',
    scope: {
      'data': '=renderChannelChart',// data should be sorted before binding
      'color': '@renderChannelChartColor'
    },
    link: function postLink(scope, element, attrs) {
      var maxPointsThreshold = 5000;
      var pool = [];
      var setupWatcher = function(chart){
        scope.$watch('data', function(newVal){
          if(newVal) {
            var lastPointOfPool = _.last(pool);
            var firstPointOfNewData = _.first(newVal.data);

            // it has been sorted by outer controller
            var indexStart = (lastPointOfPool && (_.findIndex(newVal.data, {x:lastPointOfPool.x}) + 1)) || 0;

            if(indexStart !== 0 || !lastPointOfPool ||
              (lastPointOfPool && firstPointOfNewData && lastPointOfPool.x<firstPointOfNewData.x)) {

              for(var i=indexStart; i<newVal.data.length; i++) {
                var newPoint = newVal.data[i];
                pool.push(newPoint);

                var series = chart.series[0];

                // if larger than threshold, shift data array
                var shouldShift = pool.length >= maxPointsThreshold ? true : false;
                if(shouldShift) {pool.shift();}
                if(i < newVal.data.length - 1) {
                  series.addPoint(newPoint,false,shouldShift);
                }else{
                  series.addPoint(newPoint,true,shouldShift);
                }
              }
            }
          }
        }, false);
      };

      // ref: http://www.highcharts.com/demo/dynamic-master-detail
      element.highcharts({
        chart: {
          type: 'line',//spline
          //animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          events: {
            load: function () {
              setupWatcher(this);
            }
          }
        },
        title: {
          text: scope.data.text
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          title: {
            text: scope.data.text
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          //formatter: function () {
          //  return '<b>' + this.series.name + '</b><br/>' +
          //    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
          //    Highcharts.numberFormat(this.y, 2);
          //}
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        series: [{
          name: 'Random data',
          turboThreshold: 10000,
          color: scope.color,
          data: []
        }]
      });

    }
  };
});
