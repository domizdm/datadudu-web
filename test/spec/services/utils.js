'use strict';

describe('Service: utils', function () {

  // load the service's module
  beforeEach(module('dataduduR3App'));

  // instantiate service
  var utils;
  beforeEach(inject(function (_utils_) {
    utils = _utils_;
  }));

  it('injected', function () {
    expect(utils).not.toBe(null);
  });

});
