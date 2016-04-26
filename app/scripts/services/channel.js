'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.channel
 * @description
 * # channel
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('channel', function ($resource, config) {
  return $resource(config.END_POINT+'/:controller/:_action/:item/:id/:type', {
    id: '@_id',
    controller: 'channels'
  },{
    /**
     *
     account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     */
    list: {
      method: 'GET'
    },
    /**
     *
     username  (string) – search by username (optional).
     tag (string) – search by tag (optional)
     */
    listPublic: {
      method: 'GET',
      params: {
        _action: 'public'
      }
    },
    /**
     *
     account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     description (string) - Description of the Channel (optional)
     elevation (integer) - Elevation in meters (optional)
     field1 (string) - Field1 name (optional)
     field2 (string) - Field2 name (optional)
     field3 (string) - Field3 name (optional)
     field4 (string) - Field4 name (optional)
     field5 (string) - Field5 name (optional)
     field6 (string) - Field6 name (optional)
     field7 (string) - Field7 name (optional)
     field8 (string) - Field8 name (optional)
     latitude (decimal) - Latitude in degrees (optional)
     longitude (decimal) - Longitude in degrees (optional)
     metadata (text) - Metadata for the Channel, which can include JSON, XML, or any other data (optional)
     name (string) - Name of the Channel (optional)
     public_flag (true/false) - Whether the Channel should be public, default false (optional)
     tags (string) - Comma-separated list of tags (optional)
     url (string) - Webpage URL for the Channel (optional)
     */
    create: {
      method: 'POST'
    },
    /**
     *
     * id: CHANNEL_ID
     *
     account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     description (string) - Description of the Channel (optional)
     elevation (integer) - Elevation in meters (optional)
     field1 (string) - Field1 name (optional)
     field2 (string) - Field2 name (optional)
     field3 (string) - Field3 name (optional)
     field4 (string) - Field4 name (optional)
     field5 (string) - Field5 name (optional)
     field6 (string) - Field6 name (optional)
     field7 (string) - Field7 name (optional)
     field8 (string) - Field8 name (optional)
     latitude (decimal) - Latitude in degrees (optional)
     longitude (decimal) - Longitude in degrees (optional)
     metadata (text) - Metadata for the Channel, which can include JSON, XML, or any other data (optional)
     name (string) - Name of the Channel (optional)
     public_flag (true/false) - Whether the Channel should be public, default false (optional)
     tags (string) - Comma-separated list of tags (optional)
     url (string) - Webpage URL for the Channel (optional)
     */
    update: {
      method: 'PUT'
    },
    /**
     *
     * id: CHANNEL_ID
     *
     account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     */
    clear: {
      method: 'DELETE',
      params: {
        type: 'feeds'
      }
    },
    /**
     *
     * id: CHANNEL_ID
     *
     account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     */
    remove: {
      method: 'DELETE'
    },
    /**
     * http://api.datadudu.com/channels/CHANNEL_ID/feeds
     *
     api_key or token_id (string) – api_key is Read or Write key for this specific channel (no key required for public channels) or token_id for internal use, obtained through login API.
     results (integer) Number of entries to retrieve, 8000 max (optional)
     start (datetime) Start date in format YYYY-MM-DD%20HH:NN:SS (optional)
     end (datetime) End date in format YYYY-MM-DD%20HH:NN:SS (optional)
     status (true/false) Include status updates in feed by setting "status=true" (optional)
     timezone (string) Identifier from Time Zones Reference for this request (optional)
     min (decimal) Minimum value to include in response (optional)
     max (decimal) Maximum value to include in response (optional)
     sum (integer or string) Get sum of this many minutes, valid values: 10, 15, 20, 30, 60, 240, 720, 1440, "daily" (optional)
     round (integer) Round to this many decimal places (optional)
     average (integer or string) Get average of this many minutes, valid values: 10, 15, 20, 30, 60, 240, 720, 1440, "daily" (optional)
     callback (string) Function name to be used for JSONP cross-domain requests (optional)
     */
    fetchFeeds: {
      method: 'GET',
      params: {
        type: 'feeds'
      }
    },
    /**
     * http://api.datadudu.com/channels/CHANNEL_ID/api_keys?action=list
     */
    listAPIKeys: {
      method: 'GET',
      params: {
        type: 'api_keys',
        action: 'list'
      }
    }
  });
});
