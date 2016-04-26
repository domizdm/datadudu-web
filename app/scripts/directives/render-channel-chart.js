'use strict';

/**
 * @ngdoc directive
 * @name dataduduR3App.directive:renderChannelChart
 * @description
 * # renderChannelChart
 */
angular.module('dataduduR3App')
.directive('renderChannelChart', function ($log) {
  return {
    template: '<div></div>',
    restrict: 'AE',
    scope: {
      'title': '@renderChannelChartTitle',
      'color': '@renderChannelChartColor',

      'data': '=renderChannelChart',// data should be sorted before binding
      'api': '=renderChannelChartApi',
      'maxPoints': '=?renderChannelChartMaxPoint'
    },
    link: function postLink(scope, element, attrs) {

      var s0 = {
        name: scope.title,
        turboThreshold: 10000,// do not exceed 10k
        color: scope.color,
        data: []
      };


      var pool = [];

      var redraw = function(chart, newVal) {

        var maxPoints = parseInt(scope.maxPoints, 10) || 5000;//5000

        if(newVal) {
          var lastPointOfPool = _.last(pool);
          var firstPointOfNewData = _.first(newVal.data);

          // it has been sorted by outer controller
          var indexStart = (lastPointOfPool && (_.findIndex(newVal.data, {x:lastPointOfPool.x}) + 1)) || 0;

          if(indexStart !== 0 || !lastPointOfPool ||
            (lastPointOfPool && firstPointOfNewData && lastPointOfPool.x<firstPointOfNewData.x)) {

            var series = chart.series[0];

            for(var i=indexStart; i<newVal.data.length; i++) {
              var newPoint = newVal.data[i];
              pool.push(newPoint);

              // if larger than threshold, shift data array
              var shouldShift = pool.length >= maxPoints ? true : false;
              if(shouldShift) {pool.shift();}
              if(i < newVal.data.length - 1) {
                series.addPoint(newPoint,false,shouldShift);
              }else{
                series.addPoint(newPoint,true,shouldShift);
              }
            }
          }
        }
      } ;

      var setupWatcher = function(chart){
        scope.$watch('data', function(newVal){
          redraw(chart, newVal);
        }, true);
      };


      // ref: http://www.highcharts.com/demo/dynamic-master-detail
      element.highcharts({
        chart: {
          type: 'line',//spline
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          events: {
            load: function () {
              var chart = this;

              setupWatcher(chart);

              scope.api = {
                redraw: function(){
                  redraw(chart, scope.data);
                },
                clear: function(){
                  if(chart.series && chart.series[0]){
                    chart.series[0].setData([]);
                    pool.splice(0);
                  }
                }
              };
            }
          }
        },
        title: {
          text: 'Chart ' + scope.title
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          title: {
            text: scope.title
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
        series: [s0]
      });

    }
  };
});
