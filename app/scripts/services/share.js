'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.share
 * @description
 * # share
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('share', function ($resource, config) {
  return $resource(config.END_POINT+'/:controller/:_action/:item/:id/:_type/:type_id/:_extra_1', {
    id: '@_id',
    controller: 'share'
  },{
    /**
     * View Channels Shared to Others

     To view the list of channels shared to others, send an HTTP GET to http://api.datadudu.cn/share/channels/to-others


     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     username (string): (optional) if username is supplied, will only list the channels shared to selected username
     user_id (string): (optional) if user_id is supplied, will only list the channels shared to selected user_id
     channel_id (string): (optional) if channel_id is supplied, will list the records matching such channel_id
     */
    listChannelsMeToOthers: {
      method: 'GET',
      _action: 'channels'
    },
    /**
     * View Channels Shared to Others

     To view the list of channels shared to others, send an HTTP GET to http://api.datadudu.cn/share/channels/to-others


     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     username (string): (optional) if username is supplied, will only list the channels shared to selected username
     user_id (string): (optional) if user_id is supplied, will only list the channels shared to selected user_id
     channel_id (string): (optional) if channel_id is supplied, will list the records matching such channel_id
     */
    listChannelsOthersToMe: {
      method: 'GET',
      _action: 'channels',
      item: 'to-others'
    },
    /**
     * Share Channels

     To share a list of channels to someone, send an HTTP POST of JSON to http://api.datadudu.cn/share/channels.


     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     JSON Body FIELDS:
     <>·channels (array): array of channel_id that for sharing
     <>·to (string): user_id of the user that channels are shared to
     */
    shareChannelsToUser: {
      method: 'POST',
      params: {
        _action: 'channels',
        _json: true
      }
    }

  });
});
