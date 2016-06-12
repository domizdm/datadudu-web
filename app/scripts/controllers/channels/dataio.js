'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsDataIOCtrl
 * @description
 * # ChannelsDataIOCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsDataIOCtrl', function($scope, $q, $filter, $route, $window, $log, $location, Auth,
                                            config, $uibModal, ngNotify, modalConfirm, channel, $httpParamSerializer){


  var today = new Date();
  var begin = new Date(today);

  $scope.form = {
    begin: begin,
    end: today
  };

  $scope.$watch('channel', function(newVal){
    if(newVal) {
      $scope.form = _.extend($scope.form, $scope.channel);

      var query = {
        id: $scope.channel.channel_id,
        results: 1//只需要知道第一个点作为起始,缩减数据量
      };
      channel.fetchFeeds(query)
        .$promise
        .then(function(resp){
          var firstPoint = _.first(resp.feeds);
          if(firstPoint){
            var feedbackDate=new Date(new Date(firstPoint.created_at));
            $scope.form.begin = feedbackDate;
          }
        });

    }
  });


  $scope.download = function(channel){
    if(channel) {
      var timezone = 'GMT+08:00';
      var serverFormat = 'yyyy-MM-dd HH:mm:ss';

      var begin = $scope.form.begin;
      var end = $scope.form.end;

      var query = {
        //timezone: '+08:00',
        start: begin !== null ? $filter('date')(begin, serverFormat, timezone) : undefined,
        end: end !== null ? $filter('date')(end, serverFormat, timezone) : undefined,
        token_id: Auth.me().token_id
      };

      var url=config.END_POINT+'/channels/'+channel.channel_id+'/feeds.csv?'+$httpParamSerializer(query);

      $window.open(url, '_blank');
    }
  };

});
