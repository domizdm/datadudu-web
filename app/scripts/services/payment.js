'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.trigger
 * @description
 * # trigger
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('payment', function ($resource, config) {

  return $resource(config.END_POINT_PAYMENT+'/:controller/:_action/:item', {
    id: '@_id',
    controller: 'payment'
  },{
    /**
     * 支付接口

     发送Post表单到/payment/payment.php  例如http://console.datadudu.cn/payment/payment.php

     Form 表单中需要:

     bank_id （目前有alipay和wechat两种）
     username填写用户名
     amount 填写金额, 目前最小金额0.01 ，以后还会做调整
     如果选择支付宝，console平台弹出modal 显示提示窗口，并直接弹出支付宝支付页面。支付宝支付完成后，会自动跳转到console指定页面，同时可以通过“统一invoice查看接口查看支付状态”
     如果选择微信支付console平台弹出modal显示微信支付二维码，上一部返回的json中url为二维码的图片地址, 显示在页面modal中, invoice_id也用于查询订单状态，。 2分钟后会过期，应该让用户点击，重新获取。
     */
    sendChargeRequest: {
      method: 'POST',
      responseType:'json',
      _json: true,
      params: {
        _action: 'payment.php'
      }
    },
    /**
     *
     显示二维码的同时，在后台每2秒发送一次请求查询支付处理情况：
     http://console.datadudu.cn/payment/wechat/wechatQuery.php?method=isPaid&invoice_id=xxxxxx
     并发送invoice_id
     返回值如下：只有在SUCCESS的时候再进行跳转支付成功的页面。
     SUCCESS—支付成功
     NOTPAY—未支付
     CLOSED—已关闭
     REVOKED—已撤销（刷卡支付）
     USERPAYING--用户支付中
     PAYERROR--支付问题
     统一接口查看订单状态（比较适用于支付宝支付）:

     发送GET或者POST到http://api.datadudu.cn/finance/invoice/status

     Request Parameter传递invoice_id, 如果返回的json里invoice的invoice_status是paid的话表示支付成功。
     */
    sendWechatQuery: {
      method: 'GET',
      responseType:'json',
      params: {
        _action: 'wechat',
        item: 'wechatQuery.php',
        method: 'isPaid'
      }
    }

  });
});
