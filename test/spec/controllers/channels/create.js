'use strict';

describe('Controller: ChannelsCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('dataduduR3App'));

  var ChannelcreatectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChannelcreatectrlCtrl = $controller('ChannelcreatectrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
