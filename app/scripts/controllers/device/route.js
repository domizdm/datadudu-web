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
      .when('/addproducts/:id',{
        templateUrl:  'views/device/addproducts.html',
        controller:'AddProductsCtrl'
      })
      .when('/productdetails/:product_id',{
        templateUrl:  'views/device/productdetails.html',
        controller:'ProductDetailsCtrl'
      })
      .when('/mydevice-dashboard',{
        templateUrl:  'views/device/mydevices-dashboard.html',
        controller:'MyDevicesDashboardCtrl'
      })
      .when('/mydevice-dashboard/:id/:subview', {
        templateUrl: function(urlattr){
          //console.log(urlattr);
          return 'views/device/mydevices-main.html';
        },
        controller: 'MyDevicesMainCtrl'
      })
  });
