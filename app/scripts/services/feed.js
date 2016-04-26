'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.feed
 * @description
 * # feed
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('feed', function ($resource, config) {

  return $resource(config.END_POINT+'/:_action/:id', {
    id: '@_id'
  },{
    addFeed: {
      method: 'POST',
      params: {
        _action: 'update'
      }
    }
  });

});
