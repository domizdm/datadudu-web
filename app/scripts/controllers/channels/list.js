'use strict';

/**
 * @ngdoc function
 * @name dataduduR3App.controller:ChannelslistCtrl
 * @description
 * # ChannelslistCtrl
 * Controller of the dataduduR3App
 */
angular.module('dataduduR3App')
.controller('ChannelsListCtrl', function (account) {//, $httpParamSerializerJQLike

  //$.ajax({
  //  type: "POST",
  //  url: config.END_POINT+"/accounts/login",
  //  data: {username:'wangmao',password:'wangmao'},
  //  success: function(data,status){},
  //  error:function(data,status){
  //  }
  //});

  account.login(null, {
      username:'wangmao',
      password:'wangmao'
    })
    .$promise
    .then(function(resp){
    });
});
