'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsPrivateCtrl
 * @description
 * # ChannelsPrivateCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsPrivateCtrl', function($scope, $q, $filter, $window, $timeout, $log, Auth,
                                            $httpParamSerializer, config, $uibModal, ngNotify, channel){
  $scope.loading = false;

  $scope.durations = [
    {label:Auth.L('data-graph.durations.all'), value:null},
    {label:Auth.L('data-graph.durations.60'), value:'60'},
    {label:Auth.L('data-graph.durations.120'), value:'120'},
    {label:Auth.L('data-graph.durations.240'), value:'240'},
    {label:Auth.L('data-graph.durations.480'), value:'480'},
    {label:Auth.L('data-graph.durations.1440'), value:'1440'},
    {label:Auth.L('data-graph.durations.4320'), value:'4320'},
    {label:Auth.L('data-graph.durations.10080'), value:'10080'},
    {label:Auth.L('data-graph.durations.43200'), value:'43200'}
  ];

  var defaultDuration = $scope.durations[0];
  var defaultBegin = null;//new Date();// FIXME: hard code date for debug '2016-04-22 18:00'
  //defaultBegin.setMinutes(defaultBegin.getMinutes() - parseInt(defaultDuration.value, 10));

  $scope.queryTypes = [
    {label:Auth.L('data-graph.queryTypes.sample'), value:'sample'},
    {label:Auth.L('data-graph.queryTypes.average'), value:'average'},
    {label:Auth.L('data-graph.queryTypes.sum'), value:'sum'},
  ];

  $scope.queryParams = [
    //10, 15, 20, 30, 60, 240, 720, 1440, "daily"
    {label:Auth.L('data-graph.queryParams.10'), value:'10'},
    {label:Auth.L('data-graph.queryParams.15'), value:'15'},
    {label:Auth.L('data-graph.queryParams.20'), value:'20'},
    {label:Auth.L('data-graph.queryParams.30'), value:'30'},
    {label:Auth.L('data-graph.queryParams.60'), value:'60'},
    {label:Auth.L('data-graph.queryParams.240'), value:'240'},
    {label:Auth.L('data-graph.queryParams.720'), value:'720'},
    {label:Auth.L('data-graph.queryParams.1440'), value:'1440'},
    {label:Auth.L('data-graph.queryParams.daily'), value:'daily'}
  ];

  $scope.query = {
    begin: defaultBegin,
    duration: defaultDuration,
    type: $scope.queryTypes[0],
    params: $scope.queryParams[0]
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
  var loadData = function(channelId, begin, scale, queryType, queryParams){
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

    if(queryType != 'sample') {
      query[queryType] = queryParams;
    }

    // if start/end is null, it would generate a Invalid Date - Date object
    if(isNaN(begin)) delete query.begin;
    if(isNaN(end)) delete query.end;

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

          // handle response with 'is_truncated=true', data will be reduced by server
          if(resp.is_truncated==true){
            ngNotify.set(Auth.L('private.update'), 'warn');
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

      loadData(channel.channel_id, begin, scale, $scope.query.type.value, $scope.query.params.value)
        .then(function(resp){
          $scope.loading = false;
          $scope.channelsFeeds = resp.channelsFeeds;
          //$log.log($scope.channelsFeeds);
          // set time back
          // 如果有数据, 理论上第一个点的时间应该跟查询吻合
          var firstPoint = _.first(resp.raw.feeds);
          var lastPoint = _.last(resp.raw.feeds);

          if(firstPoint != null && lastPoint != null) {// 就算只有一个点也就是两点一致
            var fDate = new Date(firstPoint.created_at);
            var lDate = new Date(lastPoint.created_at);

            var expectDate = null;
            if(fDate <= lDate) {
              expectDate = fDate;
            }else if(fDate > lDate) {
              expectDate = lDate;
            }else{
              // 当两个date都是NaN时会出现,
              // left it null
            }

            if(expectDate && (begin==null || isNaN(begin))){//只有未选定的情况才回选
              $scope.query.begin = expectDate;
            }
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
        end: end !== null ? $filter('date')(end, serverFormat, timezone) : undefined,
        token_id: Auth.me().token_id
      };

      var queryType = $scope.query.type.value;
      var queryParams = $scope.query.params.value;
      if(queryType != 'sample') {
        query[queryType] = queryParams;
      }

      // if start/end is null, it would generate a Invalid Date - Date object
      if(isNaN(query.begin)) delete query.begin;
      if(isNaN(query.end)) delete query.end;

      var url=config.END_POINT+'/channels/'+channel.channel_id+'/feeds.csv?'+$httpParamSerializer(query);

      $window.open(url, '_blank');
    }
  };


  $scope.openModalAddPoint = function(){
    if($scope.channel) {

      channel.listAPIKeys({id:$scope.channel.channel_id})
        .$promise
        .then(function(resp){
          var writeKey = resp.write_key;

          $uibModal.open({
              templateUrl: 'views/channels/particle/modalAddPoint.html',
              controller: 'ChannelsAddPointCtrl',
              resolve: {
                fields: function(){
                  return $scope.channelsFields;
                },
                writeKey: function(){
                  return writeKey;
                }
              }
            })
            .result
            .then(function(form){}, function(){/*dismiss*/});
        })
        .catch(function(err){
          ngNotify.set(err.statusText, 'error');
        });
    }
  };

});
