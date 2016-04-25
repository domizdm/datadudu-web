'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsRealtimeCtrl
 * @description
 * # ChannelsRealtimeCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsRealtimeCtrl', function($scope, $q, $filter, $timeout, $interval, $log, channel){

  $scope.chartMaxPoints = 300;
  $scope.frequencies = [
    {label:'1s',value:1000},
    {label:'2s',value:2000},
    {label:'5s',value:5000},
    {label:'10s',value:10000},
    {label:'30s',value:30000}
  ];
  $scope.liveFreq = $scope.frequencies[2];

  /**
   *
   * @param channelId
   * @param begin Date
   * @returns {Date}
     */
  var loadData = function(channelId, begin){
    var timezone = 'GMT+08:00';//FIXME: 目测server上不填timezone的情况下会自动减8?
    var serverFormat = 'yyyy-MM-dd HH:mm:ss';

    var query = {
      id: channelId,
      start: begin !== null ? $filter('date')(begin, serverFormat, timezone) : undefined,
      results: 300//threshold in page for render-channel-chart should be same
    };

    return $q(function(resolve, reject){
      channel.fetchFeeds(query)
        .$promise
        .then(function(resp){
          var channelsMap = {};

          if(resp.channel) {
            // collect all channels key and data to draw chart eg. field1~8
            _.each(resp.channel, function(v,k){
              if(/^field\d+/.test(k)) {
                channelsMap[k] = {
                  text: v,
                  data: []
                };

                // traverse all feeds of that channel field
                _.each(resp.feeds, function(v){
                  if(v[k] != null){
                    var value = parseFloat(v[k]);
                    var created_at = new Date(v['created_at']);

                    // push valid data only, and ignore the invalids
                    if(!isNaN(value) && !isNaN(created_at.getTime())) {
                      channelsMap[k].data.push({
                        x: created_at.getTime(),
                        y: value
                      });
                    }else{
                      $log.log('Found invalid data, ignored.');
                    }
                  }
                });

                // sort that field of channel
                channelsMap[k].data.sort(function(a,b){
                  return a.x - b.x;
                });
              }
            });
            // - end collect key & data
            //$log.log(channelsMap);
          }

          resolve({channelsFeeds: channelsMap, raw:resp, end:new Date(resp.end)});
        })
        .catch(function(err){
          reject(err);
        });
    });
  };

  var lastTick = null;// timeout promise
  var lastEnd = null;// 上次数据end time
  $scope.liveData = true;// 持续加载数据
  $scope.channelsFeeds = null;
  $scope.channelsFields = null;
  $scope.chartsApi = {};

  /**
   *
   * @param channelId
   * @param end
   * @param scale in minutes
   * @param interval in milliseconds
   * @param forced force reload, cancel the existed timer
   */
  var nextTick = function(channelId, end, interval, forced){
    $timeout.cancel(lastTick);

    lastTick = $timeout(function() {
      // load data while force reload or live data switch on
      if(forced || $scope.liveData) {
        loadData(channelId, end==null ? null : new Date(end))
          .then(function(resp){
            $scope.channelsFeeds = resp.channelsFeeds;
            //$log.log($scope.channelsFeeds);

            var lastFeed = _.last(resp.raw.feeds);
            if(lastFeed) {
              lastEnd = new Date(lastFeed.created_at);
            }
            nextTick(channelId, new Date(lastEnd));// 1h data per live fetch
          })
          .catch(function(err){
            nextTick(channelId, new Date(lastEnd));// 1h data per live fetch
          });
      }else{
        nextTick(channelId, new Date(lastEnd));
      }
    }, interval===undefined ? $scope.liveFreq.value : interval);
  };

  $scope.reloadData = function(channel, latest) {

    $scope.liveData = true;

    // clear all points in highcharts
    _.each($scope.chartsApi, function(v,k){
      v.clear();
    });

    // 必须置null触发render-channel-chart的watch
    $scope.channelsFeeds = null;

    if(null != channel) {
      if(!latest) {
        $log.log($scope.query.begin);
        lastEnd = new Date($scope.query.begin);
        nextTick(channel.channel_id, lastEnd, parseInt($scope.query.duration.value, 10), 0, true);// 0 for fetch immediately
      }else{
        nextTick(channel.channel_id, null, null, 0, true);// 0 for fetch immediately
      }
    }
  };

  $scope.toggleLiveData = function() {
    $scope.liveData = !$scope.liveData;
  };

  $scope.$watch('channel', function(newChannel){
    lastEnd = null;
    // start tick task
    $scope.reloadData(newChannel, true);

    if($scope.channel) {
      $scope.channelsFields = {};
      _.each($scope.channel, function(v,k){
        if(/^field\d+/.test(k)) {
          $scope.channelsFields[k] = {
            key: k,
            text: v
          };
        }
      });
    }

  }, true);

  $scope.$on('$destroy', function(){
    $log.log('on destroy, cancel all timer');
    $timeout.cancel(lastTick);
  });

  $scope.pickColor = function(seed){
    var colors = ['#00f','#f00','#0f0', '#740', '#047', '#074', '#44f', '#4f4', '#f44'];
    var colorIndex = seed % colors.length;
    return colors[colorIndex];
  };

});
