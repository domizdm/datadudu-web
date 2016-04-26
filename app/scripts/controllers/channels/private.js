'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsPrivateCtrl
 * @description
 * # ChannelsPrivateCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsPrivateCtrl', function($scope, $q, $filter, $window, $timeout, $log,
                                            $httpParamSerializer, config, $uibModal, ngNotify, channel){
  $scope.loading = false;

  $scope.durations = [
    {label:'1 hour', value:'60'},
    {label:'2 hours', value:'120'},
    {label:'4 hours', value:'240'},
    {label:'8 hours', value:'480'},
    {label:'1 day', value:'1440'},
    {label:'3 days', value:'4320'},
    {label:'7 days', value:'10080'}
  ];

  var defaultDuration = $scope.durations[0];
  var defaultBegin = null;//new Date();// FIXME: hard code date for debug '2016-04-22 18:00'
  //defaultBegin.setMinutes(defaultBegin.getMinutes() - parseInt(defaultDuration.value, 10));
  $scope.query = {
    begin: defaultBegin,
    duration: defaultDuration
  };

  $scope.$on('$destroy', function(){
  });

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
    var begin = begin!=null ? new Date(begin) : null;
    var end = scale!=null ? new Date(begin) : null;
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

          resolve({channelsFeeds: channelsMap, raw: resp, end:new Date(resp.end)});
        })
        .catch(function(err){
          reject(err);
        });
    });
  };

  $scope.channelsFeeds = null;
  $scope.channelsFields = null;
  $scope.chartsApi = {};

  $scope.reloadData = function(channel) {
    // clear all points in highcharts
    _.each($scope.chartsApi, function(v,k){
      v.clear();
    });

    // 必须置null触发render-channel-chart的watch
    $scope.channelsFeeds = null;

    var begin = $scope.query.begin ? new Date($scope.query.begin) : null;
    begin = (null==begin || isNaN(begin.getTime())) ? null : begin;
    var scale = begin ? parseInt($scope.query.duration.value, 10) : null;

    if(null != channel) {
      $scope.loading = true;

      loadData(channel.channel_id, begin, scale)
        .then(function(resp){
          $scope.loading = false;

          $scope.channelsFeeds = resp.channelsFeeds;
          //$log.log($scope.channelsFeeds);

          // set time back
          // 如果有数据, 理论上第一个点的时间应该跟查询吻合
          var firstPoint = _.first(resp.raw.feeds);
          if(firstPoint){
            var feedbackDate=new Date(new Date(firstPoint.created_at));
            $scope.query.begin = feedbackDate;
          }
        })
        .catch(function(err){
          $scope.loading = false;
          ngNotify.set(err.statusText, 'error');
        });
    }
  };

  $scope.$watch('channel', function(newChannel){
    // start tick task
    $scope.reloadData(newChannel);

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

  $scope.pickColor = function(seed){
    var colors = ['#00f','#f00','#0f0', '#740', '#047', '#074', '#44f', '#4f4', '#f44'];
    var colorIndex = seed % colors.length;
    return colors[colorIndex];
  };

  $scope.download = function(channel) {
    if(channel) {
      var timezone = 'GMT+08:00';//FIXME: 目测server上不填timezone的情况下会自动减8?
      var serverFormat = 'yyyy-MM-dd HH:mm:ss';

      var begin = $scope.query.begin ? new Date($scope.query.begin) : null;
      begin = (null==begin || isNaN(begin.getTime())) ? null : begin;
      var scale = begin ? parseInt($scope.query.duration.value, 10) : null;
      var end = scale!=null ? new Date(begin) : null;
      if(end) {
        end.setMinutes(end.getMinutes() + scale);
      }

      var query = {
        //timezone: '+08:00',
        start: begin !== null ? $filter('date')(begin, serverFormat, timezone) : undefined,
        end: end !== null ? $filter('date')(end, serverFormat, timezone) : undefined
      };

      var url=config.END_POINT+'/channels/'+channel.channel_id+'/feeds.csv?'+$httpParamSerializer(query);

      $window.open(url, '_blank');
    }
  };


  $scope.openModalAddPoint = function(){
    if($scope.channel) {
      $uibModal.open({
          templateUrl: 'views/channels/particle/modalAddPoint.html',
          controller: 'ChannelsAddPointCtrl',
          resolve: {
            fields: function(){
              return $scope.channelsFields
            },
            writeKey: $scope.channel.write_key
          }
        })
        .result
        .then(function(form){
          $log.log(form);
        }, function(){
          $log.log('modal result 2');
        });
    }
  };

});
