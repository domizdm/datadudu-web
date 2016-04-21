'use strict';

describe('Controller: ChannelsListCtrl', function () {

  // load the controller's module
  beforeEach(module('dataduduR3App'));

  var ChannelslistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChannelslistCtrl = $controller('ChannelsListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  //it('should attach a list of awesomeThings to the scope', function () {
  //});
});
