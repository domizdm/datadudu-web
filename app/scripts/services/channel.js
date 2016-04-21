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
  return $resource(config.END_POINT+'/:controller/:action/:item/:id/:type', {
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
        action: 'public'
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
    }
  });
});
