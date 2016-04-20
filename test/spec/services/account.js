'use strict';

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

});
