'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.group
 * @description
 * # channel
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('group', function ($resource, config) {
  return $resource(config.END_POINT+'/:controller/:_action/:item/:id/:_type/:type_id/:_extra', {
    id: '@_id',
    controller: 'groups'
  },{
    /**
     *List Channel Groups 存储空间组列表

     send an HTTP GET/POST to http://api.ubibot.cn/groups/channels/list_groups

     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     */
    list: {
      method: 'GET',
      params: {
        _action: 'channels',
        item: 'list_groups'
      }
    },
    /**
     * Create Group 创建分组

     send an HTTP GET/POST to http://api.ubibot.cn/groups/channels/create_group

     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     JSON Body FIELDS:
     group_name
     */
    create: {
      method: 'POST',
      params: {
        _action: 'channels',
        item: 'create_group',
        _json: true
      }
    },
    /**
     * Delete Channel Group 删除分组

     send an HTTP GET/POST to http://api.ubibot.cn/groups/channels/delete_group

     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     group_id
     */
    delete: {
      method: 'POST',
      params: {
        _action: 'channels',
        item: 'delete_group'
      }
    },
    /**
     * Add Channels To Group 将存储空间添加到分组中

     send an HTTP GET/POST to http://api.ubibot.cn/groups/channels/add_channels

     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     JSON Body FIELDS:
     group_id
     channels: 为channel_id列表，例如channels: [171,172]
     */
    addChannels: {
      method: 'POST',
      params: {
        _action: 'channels',
        item: 'add_channels',
        _json: true
      }
    },
    /**
     * Remove Channels From Group 将存储空间从分组中删除

     send an HTTP GET/POST to http://api.ubibot.cn/groups/channels/remove_channels

     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     JSON Body FIELDS:
     group_id
     channels: 为channel_id列表，例如channels: [171,172]
     */
    removeChannel: {
      method: 'POST',
      params: {
        _action: 'channels',
        item: 'remove_channels',
        _json: true
      }
    },
    /**
     * List Group Channels 查看组中存储空间列表

     send an HTTP GET/POST to http://api.ubibot.cn/groups/channels/list_channels

     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     group_id
     */
    listChannels: {
      method: 'GET',
      params: {
        _action: 'channels',
        item: 'list_channels',
      }
    }
  });
});
