'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelsListCtrl
 * @description
 * # ChannelsListCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsListCtrl', function (Auth) {//, $httpParamSerializerJQLike
  Auth.isLoggedInAsync()
    .then();
});
