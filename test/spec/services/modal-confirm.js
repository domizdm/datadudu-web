'use strict';

describe('Service: modalConfirm', function () {

  // load the service's module
  beforeEach(module('dataduduR3App'));

  // instantiate service
  var modalConfirm;
  beforeEach(inject(function (_modalConfirm_) {
    modalConfirm = _modalConfirm_;
  }));

  it('should do something', function () {
    expect(!!modalConfirm).toBe(true);
  });

});
