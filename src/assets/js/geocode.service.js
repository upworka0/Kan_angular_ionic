(function() {
  'use strict';
  var ClearFieldDirective, GEOCODER, Geocoder, MODAL_VIEW, VerifyLookupCtrl, geocodeSvcConfig;

  GEOCODER = {
    STATUS: {},
    instance: null,
    ZERO_RESULT_LOC: [37.77493, -122.419416]
  };

  MODAL_VIEW = {
    DISPLAY_LIMIT: 5,
    OFFSET_HEIGHT: 420 + 106, // 420 px for normal usage, +106px for plnkr toolbar
    GRID_RESPONSIVE_SM_BREAK: 680,
    MARGIN_TOP_BOTTOM: 0.1 + 0.1,
    MAP_MIN_HEIGHT: 200,
    MESSAGE: {
      ZERO_RESULTS_ERROR: "No results found, please try again.",
      VERIFY_LABEL: "This is how the location will be displayed",
      MULTIPLE_RESULTS: "[multiple results]"
    }
  };

  geocodeSvcConfig = function(uiGmapGoogleMapApiProvider, API_KEY) {
    var cfg;
    cfg = {};
    if (API_KEY) {
      cfg.key = API_KEY;
    }
    uiGmapGoogleMapApiProvider.configure(cfg);
  };

  geocodeSvcConfig.$inject = ['uiGmapGoogleMapApiProvider', 'API_KEY'];


  /*
   * @description Google Maps Geocode Service v3
   * see https://developers.google.com/maps/documentation/geocoding/intro
   */

  Geocoder = function($q, $ionicPlatform, appModalSvc, uiGmapGoogleMapApi) {
    var init, mathRound6, self;
    init = function(maps) {
      GEOCODER.STATUS = maps.GeocoderStatus;
      GEOCODER.instance = new maps.Geocoder();
    };
    mathRound6 = function(v) {
      if (_.isNumber(v)) {
        return Math.round(v * 1000000) / 1000000;
      }
      return v;
    };
    uiGmapGoogleMapApi.then(function(maps) {
      console.log("uiGmapGoogleMapApi promise resolved");
      init(maps);
    });
    self = {

      /*
      @description an Entry Point for this service, returns an object with a geocode location
      @return object { address: location: place_id:(options) }
        'NOT FOUND', 'CANCELED', 'ERROR'
       */
      getLatLon: function(address) {
        return self.displayGeocode(address).then(function(result) {
          var location, ref, ref1, ref2, resp;
          if (!result || result === 'CANCELED') {
            return null;
          }
          if (_.isString(result)) {
            return result;
          }
          if ((ref = result.override) != null ? ref.location : void 0) {
            location = (ref1 = result.override) != null ? ref1.location : void 0;
          } else {
            location = result['geometry']['location'];
            location = [location.lat(), location.lng()];
          }
          location = _.map(location, function(v) {
            return mathRound6(v);
          });
          resp = {
            address: ((ref2 = result.override) != null ? ref2.address : void 0) || result['formatted_address'],
            location: location
          };
          if (!result.override) {
            resp['place_id'] = result['place_id'];
          }
          return resp;
        })["catch"](function(err) {
          return 'ERROR';
        });
      },

      /*
      @description launches addressMap modal to allow user to verifiy location of address
      @param address String
      @return object, one geocode result or CANCELED, ZERO_RESULTS
       */
      displayGeocode: function(address) {
        return self.geocode(address).then(function(results) {
          if (results === GEOCODER.STATUS.ZERO_RESULTS) {
            console.log("ZERO_RESULTS FOUND");
            results = [self.getPlaceholderDefault()];
          }
          return self.showResultsAsMap(address, results).then(function(result) {
            return result;
          });
        })["catch"](function(err) {
          console.warn(err);
        });
      },
      geocode: function(address) {
        var dfd;
        if (GEOCODER.instance == null) {
          return $q.reject("Geocoder JS lib not ready");
        }
        dfd = $q.defer();
        GEOCODER.instance.geocode({
          "address": address
        }, function(result, status) {
          switch (status) {
            case 'OK':
              return dfd.resolve(result);
            case GEOCODER.STATUS.ZERO_RESULTS:
              return dfd.resolve(GEOCODER.STATUS.ZERO_RESULTS);
            default:
              console.err(['geocodeSvc.geocode()', status]);
              return dfd.reject({
                status: status,
                result: result
              });
          }
        });
        return dfd.promise;
      },
      getPlaceholderDefault: function() {
        var geoCodeResult;
        return geoCodeResult = {
          geometry: {
            location: {
              lat: function() {
                return GEOCODER.ZERO_RESULT_LOC[0];
              },
              lng: function() {
                return GEOCODER.ZERO_RESULT_LOC[1];
              }
            }
          },
          status: GEOCODER.STATUS.ZERO_RESULTS,
          formatted_address: '[location not found]'
        };
      },
      showResultsAsMap: function(address, geoCodeResults) {
        return appModalSvc.show('address-lookup.template.html', 'VerifyLookupCtrl as vm', {
          address: address,
          geoCodeResults: geoCodeResults
        }).then(function(modalResult) {
          var geoCodeResult, mm;
          if (_.isString(modalResult || !modalResult)) {
            return modalResult;
          }
          mm = modalResult;
          geoCodeResult = mm['geoCodeResults'][0];
          geoCodeResult.override = {};
          if (mm['marker-moved']) {
            geoCodeResult.override['location'] = mm.location;
          }
          if (mm['address-changed']) {
            geoCodeResult.override['address'] = mm.addressDisplay;
          }
          return geoCodeResult;
        })["catch"](function(err) {
          return $q.reject(err);
        });
      },

      /*
       * Utility Methods
       */

      /*
       * @description get a location array from an object
       * @param point object of type
       *     GEOCODER.instance.geocode() result
       *     marker from ui-gmap-marker dragend event on map
       *     model from ui-gmap-markers click event
       *       {id: latitude: longititde: formatted_address:}
       * @return [lat,lon] round to 6 decimals for google Maps API
       */
      getLocationFromObj: function(point) {
        var ref;
        if (point == null) {
          point = {};
        }
        if (((ref = point['geometry']) != null ? ref.location : void 0) != null) {
          return [mathRound6(point['geometry']['location'].lat()), mathRound6(point['geometry']['location'].lng())];
        }
        if (point.getPosition != null) {
          return [mathRound6(point.getPosition().lat()), mathRound6(point.getPosition().lng())];
        }
        if (point.longitude != null) {
          return [mathRound6(point.latitude), mathRound6(point.longitude)];
        }
        return null;
      },

      /*
       * @description add a 'random' offset to latlon to mask exact location
       * @param latlon Array, [lat,lon] expressed as decimal
       */
      maskLatLon: function(latlon, key) {
        var offset;
        key = key.slice(0, 11);
        offset = {
          lat: (self.a2nHash(latlon[0] + key) % 25) / 10000,
          lon: (self.a2nHash(latlon[1] + key) % 25) / 10000
        };
        return [mathRound6(latlon[0] + offset.lat), mathRound6(latlon[1] + offset.lon)];
      },

      /*
      @description: get google Map object for angular-google-maps,
        configured map places marker or circle at location
      @params: options
        id: string optional
        location: [lat,lon]  or [ [lat,lon], [lat,lon] ], render circle or marker at location
        type: [circle, marker]
        circleRadius: 500, in meters
        draggableMap: true
        draggableMarker: true
       */
      getMapConfig: function(options) {
        var gMapPoint, mapConfig, mapConfigOptions, markers;
        _.defaults(options, {
          location: [],
          markers: [],
          type: 'oneMarker',
          circleRadius: 500,
          draggableMap: true,
          draggableMarker: true
        });
        mapConfigOptions = {
          'map': {
            options: {
              draggable: options.draggableMap
            }
          }
        };
        switch (options.type) {
          case 'circle':
            gMapPoint = {
              latitude: mathRound6(options.location[0]),
              longitude: mathRound6(options.location[1])
            };
            mapConfigOptions['circle'] = {
              center: gMapPoint,
              stroke: {
                color: '#FF0000',
                weight: 1
              },
              radius: options.circleRadius,
              fill: {
                color: '#FF0000',
                opacity: '0.2'
              }
            };
            break;
          case 'oneMarker':
            gMapPoint = {
              latitude: mathRound6(options.location[0]),
              longitude: mathRound6(options.location[1])
            };
            mapConfigOptions['oneMarker'] = {
              idKey: '1',
              coords: gMapPoint,
              options: {
                draggable: options.draggableMarker
              }
            };
            if (options.draggableMarker) {
              mapConfigOptions['oneMarker']['events'] = {
                'dragend': options.dragendMarker
              };
            }
            break;
          case 'manyMarkers':
            markers = _.map(options.markers, function(result, i, l) {
              var point;
              point = result['geometry']['location'];
              return {
                'id': i,
                'latitude': mathRound6(point.lat()),
                'longitude': mathRound6(point.lng()),
                'formatted_address': result.formatted_address
              };
            });
            mapConfigOptions['manyMarkers'] = {
              models: markers,
              options: {
                draggable: options.draggableMarker
              },
              events: {
                'click': options.clickMarker
              }
            };
            if (options.draggableMarker) {
              mapConfigOptions['manyMarkers']['events']['dragend'] = options.dragendMarker;
            }
            gMapPoint = markers[0];
        }
        return mapConfig = {
          type: options.type,
          center: angular.copy(gMapPoint),
          zoom: 14,
          scrollwheel: false,
          options: mapConfigOptions
        };
      }
    };
    return self;
  };

  Geocoder.$inject = ['$q', '$ionicPlatform', 'appModalSvc', 'uiGmapGoogleMapApi'];


  /*
  @description Controller for geocodeSvc.showResultsAsMap() Modal
  @param parameters.geoCodeResult Array of geocode results
         parameters.address String, the original search string
   */

  VerifyLookupCtrl = function($scope, parameters, $q, $timeout, $window, geocodeSvc) {
    var init, parseLocation, setMapHeight, setupMap, vm;
    vm = this;
    vm.isBrowser = !ionic.Platform.isWebView();
    vm.MESSAGE = MODAL_VIEW.MESSAGE;
    vm.isValidMarker = function() {
      if (vm['error-address0']) {
        return false;
      }
      if (vm.map.type === 'oneMarker') {
        return true;
      }
      return false;
    };
    init = function(parameters) {
      var stop;
      vm['geoCodeResults'] = parameters.geoCodeResults.slice(0, MODAL_VIEW.DISPLAY_LIMIT);
      vm['map'] = setupMap(parameters.address, vm['geoCodeResults']);
      stop = $scope.$on('modal.afterShow', function(ev) {
        var h;
        h = setMapHeight();
        if (typeof stop === "function") {
          stop();
        }
      });
    };
    setMapHeight = function() {
      var contentH, mapH, styleH;
      contentH = $window.innerWidth <= MODAL_VIEW.GRID_RESPONSIVE_SM_BREAK ? $window.innerHeight : $window.innerHeight * (1 - MODAL_VIEW.MARGIN_TOP_BOTTOM);
      mapH = contentH - MODAL_VIEW.OFFSET_HEIGHT;
      mapH = Math.max(MODAL_VIEW.MAP_MIN_HEIGHT, mapH);
      // console.log(["height=", $window.innerHeight, contentH, mapH]);
      styleH = "#address-lookup-map .wrap {height: %height%px;}\n#address-lookup-map .angular-google-map-container {height: %height%px;}";
      styleH = styleH.replace(/%height%/g, mapH);
      angular.element(document.getElementById('address-lookup-style')).append(styleH);
      return mapH;
    };
    parseLocation = function(geoCodeResultOrModel, target) {
      var location0, resp;
      if (_.isEmpty(geoCodeResultOrModel)) {
        return {};
      }
      location0 = geocodeSvc.getLocationFromObj(geoCodeResultOrModel);
      resp = {
        'location': location0,
        'latlon': location0.join(', '),
        'addressFormatted': geoCodeResultOrModel.formatted_address,
        'addressDisplay': angular.copy(geoCodeResultOrModel.formatted_address),
        'error-address0': null
      };
      switch (geoCodeResultOrModel.status) {
        case GEOCODER.STATUS.ZERO_RESULTS:
          resp['error-address0'] = vm.MESSAGE.ZERO_RESULTS_ERROR;
          resp['latlon'] = null;
          resp['addressDisplay'] = null;
      }
      _.extend(target, resp);
      return resp;
    };
    setupMap = function(address, geoCodeResults, model) {
      var isZeroResult, mapConfig, mapOptions, markerCount, selectedLocation;
      if (isZeroResult = geoCodeResults === GEOCODER.STATUS.ZERO_RESULTS) {
        geoCodeResults = [geocodeSvc.getPlaceholderDefault()];
      }
      vm['address0'] = address;
      markerCount = model != null ? 1 : geoCodeResults.length;
      if (markerCount === 0) {
        return;
      }
      if (markerCount === 1) {
        selectedLocation = model || vm['geoCodeResults'][0];
        parseLocation(selectedLocation, vm);
        vm['marker-moved'] = false;
        mapOptions = {
          type: isZeroResult ? 'none' : 'oneMarker',
          location: vm['location'],
          draggableMarker: true,
          dragendMarker: function(marker, eventName, args) {
            vm['location'] = geocodeSvc.getLocationFromObj(marker);
            vm['latlon'] = vm['location'].join(', ');
            vm['marker-moved'] = true;
          }
        };
        mapConfig = geocodeSvc.getMapConfig(mapOptions);
        return mapConfig;
      }
      vm['latlon'] = null;
      vm['addressFormatted'] = vm.MESSAGE.MULTIPLE_RESULTS;
      vm['addressDisplay'] = '';
      vm['error-address0'] = null;
      mapOptions = {
        type: 'manyMarkers',
        draggableMarker: true,
        markers: geoCodeResults,
        clickMarker: function(marker, eventName, model) {
          var index, newMapConfig;
          index = model.id;
          vm['geoCodeResults'] = [vm['geoCodeResults'][index]];
          newMapConfig = setupMap(model.formatted_address, null, model);
          vm['address-changed'] = true;
          vm['marker-moved'] = true;
          vm['map'] = newMapConfig;
        },
        dragendMarker: function(marker, eventName, model) {
          mapOptions.clickMarker(marker, eventName, model);
        }
      };
      return geocodeSvc.getMapConfig(mapOptions);
    };
    vm.updateGeocode = function(address) {
      vm.loading = true;
      return geocodeSvc.geocode(address).then(function(results) {
        if (results === GEOCODER.STATUS.ZERO_RESULTS) {
          console.log("ZERO_RESULTS FOUND");
          results = [geocodeSvc.getPlaceholderDefault()];
        }
        return results;
      }).then(function(results) {
        var newMapConfig;
        vm['geoCodeResults'] = results;
        newMapConfig = setupMap(address, vm['geoCodeResults']);
        vm['address-changed'] = false;
        vm['map'] = newMapConfig;
      }, function(err) {
        return $q.reject(err);
      })["finally"](function() {
        return $timeout(function() {
          return vm.loading = false;
        }, 250);
      });
    };
    $scope.$watch('vm.addressDisplay', function(newV) {
      vm['address-changed'] = true;
    });
    init(parameters);
    return vm;
  };

  VerifyLookupCtrl.$inject = ['$scope', 'parameters', '$q', '$timeout', '$window', 'geocodeSvc'];

  ClearFieldDirective = function($compile, $timeout) {
    var directive;
    directive = {
      restrict: 'A',
      require: 'ngModel',
      scope: {},
      link: function(scope, element, attrs, ngModel) {
        var btnTemplate, inputTypes, template;
        inputTypes = /text|search|tel|url|email|password/i;
        if (element[0].nodeName !== 'INPUT') {
          throw new Error("clearField is limited to input elements");
        }
        if (!inputTypes.test(attrs.type)) {
          throw new Error("Invalid input type for clearField" + attrs.type);
        }
        btnTemplate = "<i ng-show=\"enabled\" ng-click=\"clear()\" class=\"icon ion-close pull-right\">&nbsp;</i>";
        template = $compile(btnTemplate)(scope);
        element.after(template);
        scope.clear = function() {
          ngModel.$setViewValue(null);
          ngModel.$render();
          scope.enabled = false;
          return $timeout(function() {
            return element[0].focus();
          }, 150);
        };
        element.bind('focus', function(e) {
          scope.enabled = !ngModel.$isEmpty(element.val());
          scope.$apply();
        });
      }
    };
    return directive;
  };

  ClearFieldDirective.$inject = ['$compile', '$timeout'];


  angular.module('geocode.components')
    .constant('API_KEY', GEOCODER.API_KEY)
    .config(geocodeSvcConfig)
    .factory('geocodeSvc', Geocoder)
    .directive('clearField', ClearFieldDirective)
    .controller('VerifyLookupCtrl', VerifyLookupCtrl);

}).call(this);
