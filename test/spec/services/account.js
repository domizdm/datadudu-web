'use strict';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

describe('Service: account', function () {

  // load the service's module
  beforeEach(module('dataduduR3App'));

  // instantiate service
  var account;
  beforeEach(inject(function (_account_) {
    account = _account_;
  }));

  it('should do something', function () {
    expect(!!account).toBe(true);
  });

  beforeEach(inject(function (_RequestNormalizeInterceptor_, _$httpProvider_){
    _$httpProvider_.interceptors.push('RequestNormalizeInterceptor');
  }));

  it("should login success", function(done) {
    account.login(null, {
        username:'wangmao',
        password:'wangmao'
      })
      .$promise
      .then(function(resp){
        expect(resp).toBe(true);
        done();
      });
  });

});
