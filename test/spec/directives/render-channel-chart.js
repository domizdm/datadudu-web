'use strict';

describe('Directive: renderChannelChart', function () {

  // load the directive's module
  beforeEach(module('dataduduR3App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-render-channel-chart></-render-channel-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the renderChannelChart directive');
  }));
});
