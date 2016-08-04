'use strict';

/**
 * @ngdoc directive
 * @name dataduduR3App.directive:renderChannelChart
 * @description
 * # renderChannelChart
 */
angular.module('dataduduR3App')
.directive('renderChannelChart', function ($log, $timeout, $filter) {
  return {
    template: '<div></div>',
    restrict: 'AE',
    scope: {
      'title': '@renderChannelChartTitle',
      'titlePrefix': '=renderChannelChartTitlePrefix',
      'color': '@renderChannelChartColor',

      'data': '=renderChannelChart',// data should be sorted before binding
      'api': '=renderChannelChartApi',
      'scale': '=?renderChannelChartScale'
    },
    link: function postLink(scope, element, attrs) {

      var s0 = {
        name: scope.title,
        turboThreshold: 10000,// do not exceed 10k
        color: scope.color,
        data: []
      };

      var redraw = function(chart, newVal) {

        var series = chart.series[0];

        if(newVal) {
          var lastPointOfPool = _.last(series.data);
          var firstPointOfNewData = _.first(newVal.data);

          // 没办法,先这样
          if(scope.scale) {
            chart.xAxis[0].setExtremes(new Date().getTime() - scope.scale, null, true, false);
          }

          // it has been sorted by outer controller
          var indexStart = (lastPointOfPool && (_.findIndex(newVal.data, {x:lastPointOfPool.x}) + 1)) || 0;

          if(indexStart !== 0 || !lastPointOfPool ||
            (lastPointOfPool && firstPointOfNewData && lastPointOfPool.x<firstPointOfNewData.x)) {

            for(var i=indexStart; i<newVal.data.length; i++) {
              var newPoint = newVal.data[i];

              var shouldShift = false;

              if(i < newVal.data.length - 1) {
                series.addPoint(newPoint,false, shouldShift);
              }else{
                series.addPoint(newPoint,true, shouldShift);
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
                  }
                }
              };
            }
          }
        },
        credits: {
          enabled: false
        },
        title: {
          text: scope.titlePrefix + scope.title
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
          formatter: function () {
            //return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S %T', this.x) + '<br/>' +
            // '<b>' + this.series.name + '</b><br/>' +
            //Highcharts.numberFormat(this.y, 2);//

            //moment(this.x).format('YYYY-MM-DD hh:mm:ss Z') + '<br/>' +
            return $filter('date')(this.x, 'yyyy-MM-dd HH:mm:ss Z') + '<br/>' +
              '<span style="color:' + this.point.color + '">\u25CF</span>'+this.series.name + ': <b>'+this.point.y+'</b>';
          }
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
