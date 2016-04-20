'use strict';

describe('Service: channel', function () {

  // load the service's module
  beforeEach(module('dataduduR3App'));

  // instantiate service
  var channel;
  beforeEach(inject(function (_channel_) {
    channel = _channel_;
  }));

  it('should do something', function () {
    expect(!!channel).toBe(true);
  });

});
