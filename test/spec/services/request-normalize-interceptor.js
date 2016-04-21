'use strict';

describe('Service: RequestNormalizeInterceptor', function () {

  // load the service's module
  beforeEach(module('dataduduR3App'));

  // instantiate service
  var RequestNormalizeInterceptor;
  beforeEach(inject(function (_RequestNormalizeInterceptor_) {
    RequestNormalizeInterceptor = _RequestNormalizeInterceptor_;
  }));

  it('should do something', function () {
    expect(!!RequestNormalizeInterceptor).toBe(true);
  });

});
