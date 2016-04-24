'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsPrivateCtrl
 * @description
 * # ChannelsPrivateCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsPrivateCtrl', function($scope, $q, $filter, $timeout, $log, channel){
  $scope.durations = [
    {label:'1 hour', value:'60'},
    {label:'2 hours', value:'120'},
    {label:'4 hours', value:'240'},
    {label:'8 hours', value:'480'},
    {label:'24 hours', value:'1440'}
  ];

  var defaultDuration = $scope.durations[0];
  var defaultBegin = new Date('2016-04-22 18:00');// FIXME: hard code date for debug
  defaultBegin.setMinutes(defaultBegin.getMinutes() - parseInt(defaultDuration.value, 10));
  $scope.query = {
    begin: defaultBegin,
    duration: defaultDuration
  };

  $scope.$on('$destroy', function(){
  });

  $scope.test = null;

  /**
   *
   * @param channelId
   * @param begin Date
   * @param scale in minutes
   * @returns {Date}
     */
  var loadData = function(channelId, begin, scale){
    var timezone = 'GMT+08:00';//FIXME: 目测server上不填timezone的情况下会自动减8?
    var serverFormat = 'yyyy-MM-dd HH:mm:ss';
    var begin = begin!==undefined ? new Date(begin) : null;
    var end = scale!==undefined ? new Date(begin) : null;
    if(end) {
      end.setMinutes(end.getMinutes() + scale);
    }

    var query = {
      id: channelId,
      //timezone: '+08:00',
      start: begin !== null ? $filter('date')(begin, serverFormat, timezone) : undefined,
      end: end !== null ? $filter('date')(end, serverFormat, timezone) : undefined
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

                // traverse all feeds of that channel
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

                // sort that channel
                channelsMap[k].data.sort(function(a,b){
                  return a.x - b.x;
                });
              }
            });
            // - end collect key & data
            //$log.log(channelsMap);
          }

          resolve({channelsFeeds: channelsMap, end:new Date(resp.end)});
        })
        .catch(function(err){
          reject(err);
        });
    });
  };

  $scope.channelsFeeds = null;
  $scope.$watch('channel', function(newChannel){
    var setupLiveTimer = function(channelId, end){
      return $timeout(function(){
        loadData(channelId, new Date(end), 60)
          .then(function(resp){
            $scope.channelsFeeds = resp.channelsFeeds;

            var current = new Date();
            var from = isNaN(resp.end.getTime()) || (resp.end.getTime() > current.getTime())  ? current : resp.end;
            setupLiveTimer(channelId, from, 60);
          })
          .catch(function(err){
            setupLiveTimer(channelId, new Date(end), 60);
          });
      }, 5000);
    };

    if(null != newChannel) {
      loadData(newChannel.channel_id, new Date($scope.query.begin), parseInt($scope.query.duration.value, 10) * 60)//30
        .then(function(resp){
          $scope.channelsFeeds = resp.channelsFeeds;

          var current = new Date();
          var from = isNaN(resp.end.getTime()) || (resp.end.getTime() > current.getTime())  ? current : resp.end;
          setupLiveTimer(newChannel.channel_id, from);
        })
        .catch(function(err){
          setupLiveTimer(newChannel.channel_id, $scope.query.begin);
        });
    }
  }, true);

});
