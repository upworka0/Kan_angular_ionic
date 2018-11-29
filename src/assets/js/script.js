// condensed John Papa style
(function() {

  'use strict';
  
  angular.module('geocode', ['ionic', 'geocode.core']);
  angular.module('geocode.core', ['geocode.components']);
  angular.module('geocode.components', ['uiGmapgoogle-maps']);


  var appRun, ionicConfig, toastrConfig;

  appRun = function($rootScope, $ionicPlatform, $ionicHistory, $location, $state) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        return StatusBar.styleLightContent();
      }
    });
  };


  ionicConfig = function($ionicConfigProvider) {
    $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back').previousTitleText(false);
  };


  appRun.$inject = ['$rootScope', '$ionicPlatform', '$ionicHistory', '$location', '$state'];

  ionicConfig.$inject = ['$ionicConfigProvider'];

  angular.module('geocode.core')
    .config(ionicConfig)
    .run(appRun);
  

  var GeocodeCtrl;

  GeocodeCtrl = function($log, $scope, geocodeSvc) {
    var vm;
    vm = this;
    
    vm.address = "New York City";
    vm.latlon = "";
    vm.addressFormatted = "";
    vm.isBrowser = ionic.Platform.isWebView() === false
    vm.on = {
      testGeocode: function(address) {
        return geocodeSvc.getLatLon(address)
        .then(function(result) {
          vm.addressFormatted = result.address;
          vm.latlon = result.location
          console.log(["testGeocode", result]);
        });
      },
    }
    
    window.console.log = function(msg){
      vm.console.unshift(vm.console.length + ":" + JSON.stringify(msg, null, 2));
    }
    
    vm.loading = false;
    vm.console = [];
    console.log("ready")
    return vm
    
  };

  GeocodeCtrl.$inject = ['$log', '$scope', 'geocodeSvc'];

  angular.module('geocode')
    .controller('GeocodeCtrl', GeocodeCtrl);

}).call(this);


