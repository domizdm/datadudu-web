'use strict';

/**
 * @ngdoc overview
 * @name dataduduR3App
 * @description
 * # dataduduR3App
 *
 * Route module of the application.
 */
angular.module('dataduduR3App')
.config(function ($routeProvider) {
  $routeProvider
    .when('/myaccount',{
      templateUrl:  'views/myaccount/myaccount.html',
      controller:'MyAccountCtrl'
    })
    .when('/myprofile',{
      templateUrl: 'views/myaccount/myprofile.html',
      controller:'MyProfileCtrl'
    })
    .when('/accountsafety',{
      templateUrl: 'views/myaccount/accountsafety.html',
      controller:'AccountSafetyCtrl'
    })

  .when('/mycommunity',{
    templateUrl: 'views/myaccount/mycommunity.html',
    controller:'MyCommunityCtrl'
  })
  .when('/myattention',{
    templateUrl: 'views/myaccount/myattention.html',
    controller:'MyAttentionCtrl'
  })
  .when('/hottags',{
    templateUrl: 'views/myaccount/hottags.html',
    controller:'MyAttentionCtrl'
  })
  .when('/communitystar',{
    templateUrl: 'views/myaccount/communitystar.html',
    controller:'CommunityStarCtrl'
  });

});

