'use strict';

describe('Service: config', function () {

  // load the service's module
  beforeEach(module('dataduduR3App'));

  // instantiate service
  var config;
  beforeEach(inject(function (_config_) {
    config = _config_;
  }));

  it('should config existed', function () {
    expect(!!config).toBe(true);
  });

  it('should endpoint existed', function() {
    expect(config.END_POINT).not.toBe(null);
  });

});
