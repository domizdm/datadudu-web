'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.channel
 * @description
 * # product
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('product', function ($resource, config) {
  return $resource(config.END_POINT+'/:controller/:_action/:item/:id/:_type/:type_id/:_extra_1', {
    id: '@_id',
    controller: 'products'
  },{
    /**
     * List All My Product Batch

     To view a product batch, send HTTP GET to http://api.datadudu.cn/products


     Valid request parameters:
     account_key or token_id (string) –account_key  or token_id for internal use, obtained through login API.
     */
    list: {
      method: 'GET'
    },
    /**
     * View a Product Batch

     To view a product batch, send HTTP GET to http://api.datadudu.cn/products/PRODUCT_ID replacing PRODUCT_ID


     Valid request parameters:
     account_key or token_id (string) –account_key  or token_id for internal use, obtained through login API.
     */
    get: {
      method: 'GET',
    },
    /**
     * Search Public Product Batches

     To list/search public product batch, send HTTP GET to http://api.datadudu.cn/products-public


     Valid request parameters:
     name (string) – search by product name
     */
    listPublic: {
      method: 'GET',
      params: {
        controller: 'products-public'
      }
    },
    /**
     * Create a Product Batch

     To create a product batch, send HTTP POST to http://api.datadudu.cn/products

     Valid request parameters:
     account_key or token_id (string) –account_key  or token_id for internal use, obtained through login API.


     JSON Body FIELDS:
     name: product name
     description: product description (optional)

     field1, field2, field3, field4, field5, field6, field7, field8, metadata: channel templates (optional)

     Example Body:

     {"name":"product name", “description”: “product description”,”field1”:”field1 name”}
     */
    create: {
      method: 'POST',
      params: {
        _json: true
      }
    },
    /**
     * List Devices of a Product Batch

     To get the list of devices of a product batch, send HTTP GET to http://api.datadudu.cn/products/PRODUCT_ID/devices replacing PRODUCT_ID


     Valid request parameters:
     account_key or token_id (string) –account_key  or token_id for internal use, obtained through login API.
     */
    listDevices: {
      method: 'GET',
      params: {
        _type: 'devices'
      }
    },
    /**
     * List My Devices (devices that have been attached or activated)

     To all the devices that have been attached or activated in my account, send HTTP GET to http://api.datadudu.cn/devices


     Valid request parameters:
     account_key or token_id (string) – account_key is Read or Write key for this specific channel (no key required for public channels) or token_id for internal use, obtained through login API.
     */
    listMyDevices: {
      method: 'GET',
      params: {
        controller: 'devices'
      }
    },
    /**
     * Add Device Serials

     To add a list of device serial numbers, send HTTP POST to http://api.datadudu.cn/products/PRODUCT_ID/devices replacing PRODUCT_ID


     Valid request parameters:
     account_key or token_id (string) –account_key  or token_id for internal use, obtained through login API.
     JSON Body FIELDS:
     {"devices":[{"serial":"123"},{"serial":"456"},{"serial":"789"}]}
     */
    addDevices: {
      method: 'POST',
      params: {
        _type: 'devices',
        _json: true
      }
    },
    /**
     * Delete a Device (using Activation_Code to my account)

     To activate a device, send HTTP GET or POST to http://api.datadudu.cn/devices/ACTIVATION_CODE/delete replacing ACTIVATION_CODE
     Note: Attached or Activated device cannot be deleted
     */
    deleteDevice: {
      method: 'POST',
      params: {
        controller: 'devices',
        _type: 'delete',
        _json: true
      }
    },
    /**
     * Detach a Device (using Activation_Code to my account)

     To detach a device to my account and create a channel using product template, send HTTP GET or POST to http://api.datadudu.cn/devices/ACTIVATION_CODE/detach replacing ACTIVATION_CODE


     Valid request parameters:
     account_key or token_id (string) –account_key  or token_id for internal use, obtained through login API.
     */
    detachDevice: {
      method: 'POST',
      params: {
        controller: 'devices',
        _type: 'detach',
        _json: true
      }
    },
    /**
     * Attach a Device (using Product_ID and Serial to my account)

     To attach a device to my account and create a channel using product template, send HTTP GET or POST to http://api.datadudu.cn/products/PRODUCT_ID/devices/SERIAL/attach replacing PRODUCT_ID and SERIAL


     Valid request parameters:
     account_key or token_id (string) –account_key  or token_id for internal use, obtained through login API.
     name (string, optional) – channel name
     */
    attachDeviceByPidAndSerial: {
      method: 'POST',
      params: {
        _type: 'devices',
        _extra_1: 'attach',
        _json: true
      }
    },
    /**
     * Attach a Device (using Activation_Code to my account)

     To attach a device to my account and create a channel using product template, send HTTP GET or POST to http://api.datadudu.cn/devices/ACTIVATION_CODE/attach replacing ACTIVATION_CODE


     Valid request parameters:
     account_key or token_id (string) –account_key  or token_id for internal use, obtained through login API.
     name (string, optional) – channel name
     */
    attachDeviceByActivationCode: {
      method: 'POST',
      params: {
        controller: 'devices',
        _extra_1: 'attach',
        _json: true
      }
    }

  });
});
