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
      .when('/mydevice',{
        templateUrl:  'views/device/mydevices.html',
        controller:'MyDevicesCtrl'
      })
      .when('/myproducts',{
        templateUrl:  'views/device/myproducts.html',
        controller:'MyProductsCtrl'
      })
      .when('/addproducts',{
        templateUrl:  'views/device/addproducts.html',
        controller:'AddProductsCtrl'
      })
      .when('/productdetails/:product_id',{
        templateUrl:  'views/device/productdetails.html',
        controller:'ProductDetailsCtrl'
      })
  });
