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
  return $resource(config.END_POINT+'/:controller/:_action/:item/:id/:_type/:type_id', {
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
        _type: 'feeds'
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
        _type: 'feeds'
      }
    },
    /**
     * http://api.datadudu.com/channels/CHANNEL_ID/api_keys?action=list
     */
    listAPIKeys: {
      method: 'GET',
      params: {
        _type: 'api_keys',
        action: 'list'
      }
    },
    /**
     * Generate New Channel Write KEY

     To generate and replace the write_key of the channel, send GET/POST request to http://api.datadudu.com/channels/CHANNEL_ID/api_keys?action=generate_write_key replacing CHANNEL_ID with the ID of your channel

     Valid request parameters:
     action=generate_write_key
     account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     */
    generateWriteKey: {
      method: 'POST',
      params: {
        _type: 'api_keys',
        action: 'generate_write_key'
      }
    },
    /**
     * Update a Channel READ KEY (add note)

     To add note to a read_key of the channel, send GET/POST request to http://api.datadudu.com/channels/CHANNEL_ID/api_keys?action=update_read_key replacing CHANNEL_ID with the ID of your channel

     Valid request parameters:
     action=update_read_key
     account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     read_key (string) – the read_key that you want to delete (required).
     note (string) – the description or note of the read_key (required)

     */
    updateReadKey: {
      method: 'POST',
      params: {
        _type: 'api_keys',
        action: 'update_read_key'
      }
    },
    /**
     * Delete a Channel READ KEY

     To delete a read_key of the channel, send GET/POST request to http://api.datadudu.com/channels/CHANNEL_ID/api_keys?action=delete_read_key replacing CHANNEL_ID with the ID of your channel

     Valid request parameters:
     action=delete_read_key
     account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     read_key (string) – the read_key that you want to delete (required).
     */
    deleteReadKey: {
      method: 'POST',
      params: {
        _type: 'api_keys',
        action: 'delete_read_key'
      }
    },
    /**
     * Generate New Channel READ KEY

     To generate a new read_key of the channel, send GET/POST request to http://api.datadudu.com/channels/CHANNEL_ID/api_keys?action=generate_read_key replacing CHANNEL_ID with the ID of your channel

     Valid request parameters:
     action=generate_read_key
     account_key or token_id (string) - account_key  is User's account key; token_id  is obtained through login API (required).
     note (string): note or description of the read_key (optional)
     */
    generateReadKey: {
      method: 'POST',
      params: {
        _type: 'api_keys',
        action: 'generate_read_key'
      }
    },
    /**
     * List All of a Channel’s Commands

     To show all of a channel’s commands, send an HTTP GET to http://api.datadudu.com/channels/CHANNEL_ID/commands
     replacing CHANNEL_ID with the ID of your channel

     Valid request parameters:
     api_key or token_id (string) – api_key is Read or Write key for this specific channel (no key required for public channels) or token_id for internal use, obtained through login API.
     */
    listCommands: {
      method: 'GET',
      params: {
        _type: 'commands'
      }
    },
    /**
     * Add a Channel Command

     To add a channel command, send an HTTP POST to http://api.datadudu.com/channels/CHANNEL_ID/commands
     replacing CHANNEL_ID with the ID of your channel

     Valid request parameters:
     api_key or token_id (string) – api_key is Read or Write key for this specific channel (no key required for public channels) or token_id for internal use, obtained through login API.
     command_string:  (string) - Command to be sent to your device. There is a limit of 255 characters per command_string.
     position (integer) - The position you want this command to appear in. Any previous commands at or after this position will be shifted down. If the position is left blank, the command will automatically be added to the end of the queue (with the highest position).
     */
    addCommand: {
      method: 'POST',
      params: {
        _type: 'commands'
      }
    },
    /**
     * Delete a Channel Command

     To delete a channel’s single command by command_id, send an HTTP DELETE request to http://api.datadudu.com/channels/CHANNEL_ID/commands/COMMAND_ID
     replacing CHANNEL_ID with the ID of your channel and COMMAND_ID with the ID of the command.

     Valid request parameters:
     api_key or token_id (string) – api_key is Read or Write key for this specific channel (no key required for public channels) or token_id for internal use, obtained through login API.

     */
    deleteCommand: {
      method: 'DELETE',
      params: {
        _type: 'commands'
        //type_id: ''
      }
    },
    /**
     * Delete All of a Channel’s Commands

     To delete all of a channel’s commands, send an HTTP DELETE to http://api.datadudu.com/channels/CHANNEL_ID/commands
     replacing CHANNEL_ID with the ID of your channel.

     Valid request parameters:
     api_key or token_id (string) – api_key is Read or Write key for this specific channel (no key required for public channels) or token_id for internal use, obtained through login API.
     */
    deleteAllCommands: {
      method: 'DELETE',
      params: {
        _type: 'commands'
      }
    },
    /**
     * List Channel Rules

     To add a channel rule, send an HTTP GET to http://api.datadudu.com/channels/CHANNEL_ID/rules
     replacing CHANNEL_ID with the ID of your channel

     Valid request parameters:
     api_key or token_id (string) – api_key is Read or Write key for this specific channel (no key required for public channels) or token_id for internal use, obtained through login API. (required)
     */
    listRules: {
      method: 'GET',
      params: {
        _type: 'rules'
      }
    },
    /**
     * Add a Channel Rule

     To add a channel rule, send an HTTP POST to http://api.datadudu.com/channels/CHANNEL_ID/rules
     replacing CHANNEL_ID with the ID of your channel

     Valid request parameters:
     api_key or token_id (string) – api_key is Read or Write key for this specific channel (no key required for public channels) or token_id for internal use, obtained through login API. (required)
     type  (string) – choose between [numeric, string, no_data_check] (required)
     field (string) – choose between [field1, field2, field3, field4, field5, field6, field7, field8, status] (required)
     action_frequency (string)- choose between [change_only, always] (required)
     criteria (string) –
     <>ofor type is “numeric”, choose between [>,>=,<,<=,==,!=]
     <>ofor type is “string”, choose between [contains, starts_with, ends_with, equal, not_equal, equal_ignore_case]
     <>ofor type is “no_data_check”, WILL ADD LATER
     <>·condition (string) – value for the criteria
     */
    addRule: {
      method: 'POST',
      params: {
        _type: 'rules',
        _json: true
      }
    },
    /**
     * Update a Channel Rule

     To add a channel rule, send an HTTP PUT to http://api.datadudu.com/channels/CHANNEL_ID/rules/RULE_ID
     replacing CHANNEL_ID with the ID of your channel, and RULE_ID with ID of the rule.

     Valid request parameters:
     api_key or token_id (string) – api_key is Read or Write key for this specific channel (no key required for public channels) or token_id for internal use, obtained through login API. (required)
     type  (string) – choose between [numeric, string, no_data_check] (required)
     field (string) – choose between [field1, field2, field3, field4, field5, field6, field7, field8, status] (required)
     action_frequency (string)- choose between [change_only, always] (required)
     criteria (string) –
     <>ofor type is “numeric”, choose between [>,>=,<,<=,==,!=]
     <>ofor type is “string”, choose between [contains, starts_with, ends_with, equal, not_equal, equal_ignore_case]
     <>ofor type is “no_data_check”, WILL ADD LATER
     <>·condition (string) – value for the criteria
     */
    updateRule: {
      method: 'PUT',
      params: {
        _type: 'rules'
        //type_id: ''
      }
    },
    /**
     * Delete a Channel Rule

     To delete a channel rule, send an HTTP DELETE to http://api.datadudu.com/channels/CHANNEL_ID/rules/RULE_ID
     replacing CHANNEL_ID with the ID of your channel, RULE_ID with the ID of the rule.

     Valid request parameters:
     api_key or token_id (string) – api_key is Read or Write key for this specific channel (no key required for public channels) or token_id for internal use, obtained through login API. (required)

     */
    deleteRule: {
      method: 'DELETE',
      params: {
        _type: 'rules'
        //type_id: ''
      }
    },
    /**
     * Delete All Channel Rules

     To DELETE all channel rules, send an HTTP DELETE to http://api.datadudu.com/channels/CHANNEL_ID/rules
     replacing CHANNEL_ID with the ID of your channel

     Valid request parameters:
     api_key or token_id (string) – api_key is Read or Write key for this specific channel (no key required for public channels) or token_id for internal use, obtained through login API. (required)

     */
    deleteAllRules: {
      method: 'DELETE',
      params: {
        _type: 'rules'
      }
    }

  });
});
