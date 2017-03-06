'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.duduHttp
 * @description
 * # duduHttp
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('command', function ($resource, config) {
  return $resource(config.END_POINT+'/:controller/:_action/:item/:id/:_type/:type_id', {
    id: '@_id',
    controller: 'commands'
  },{
    /**
     * List All Commands under account (all channels commands)

     To show all of a channel’s commands, send an HTTP GET to http://api.datadudu.cn/commands

     Valid request parameters:
     account_key or token_id (string) –account_key  or token_id for internal use, obtained through login API.
     pageNumber (string): page number for the request (optional)
     itemsPerPage (string): number of items page page (optional)
     */
    list: {
      method: 'GET'
    }
  });
});
