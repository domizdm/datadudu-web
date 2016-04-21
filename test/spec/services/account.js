'use strict';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

describe('Service: account', function () {

  // load the service's module
  beforeEach(module('dataduduR3App'));

  // instantiate service
  var account, config, $httpBackend, $log;
  beforeEach(inject(function (_$httpBackend_, _account_, _config_, _$log_) {
    account = _account_;
    config = _config_;
    $httpBackend = _$httpBackend_;
    $log = _$log_;
  }));

  it("should login success", function(done) {
    $httpBackend.expectPOST(config.END_POINT+'/accounts/login')
      .respond({
        "result":"success",
        "server_time":"2016-04-21T04:48:29Z",
        "token_id":"314e0a1f485c4e9cb8ce9717392a69fa",
        "expire_time":1461215009,
        "account":{
          "user_id":"A874A453-87B0-482D-B8C5-EC45FC1B53D0",
          "username":"wangmao",
          "email":"wangmao@cloudforce.cn",
          "account_key":"961bdb0b2fe1bae959435808163bdf23",
          "created_at":"2015",
          "updated_at":"1452783042",
          "status":null,
          "timezone":"Asia\/Shanghai",
          "email_status":"pending",
          "website":"dddaaaaa",
          "bio":"dd",
          "public_flag":"true",
          "usage":"5609966"
        }});

    account.login(null, {
        username:'wangmao',
        password:'wangmao'
      })
      .$promise
      .then(function(resp){
        expect(resp).not.toBe(null);
        done();
      });

    $httpBackend.flush();
  });



  afterEach(function() {
    // Messages logged using $log.log()
    for(var i=0; i<$log.log.logs.length; i++) {
      console.log($log.log.logs[i]);
    }
  });

});
