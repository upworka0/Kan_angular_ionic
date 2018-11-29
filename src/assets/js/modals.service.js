(function() {
  'use strict';

  /*
   * @description: reusable $ionicModal service
   * see: http://forum.ionicframework.com/t/ionic-modal-service-with-extras/15357
   * also: http://codepen.io/anon/pen/KdzawK?editors=101
   * usage: appModalSvc.show( <templateUrl>, "controller as vm", params )
   */
  var ReusableModal;

  ReusableModal = function($ionicModal, $rootScope, $q, $injector, $controller) {
    var _cleanup, _evalController, show;
    show = function(templateUrl, controller, parameters, options) {
      var ctrlInstance, defaultOptions, dfd, modalScope, thisScopeId;
      dfd = $q.defer();
      modalScope = $rootScope.$new();
      thisScopeId = modalScope.$id;
      ctrlInstance = null;
      defaultOptions = {
        animation: 'slide-in-up',
        focusFirstInput: false,
        backdropClickToClose: true,
        hardwareBackButtonClose: true,
        modalCallback: null
      };
      options = angular.extend(defaultOptions, options, {
        scope: modalScope
      });
      $ionicModal.fromTemplateUrl(templateUrl, options).then(function(modal) {
        var ctrlEval, locals, same;
        modalScope.modal = modal;
        modalScope.openModal = function() {
          return modalScope.modal.show();
        };
        modalScope.closeModal = function(result) {
          dfd.resolve(result);
          return modalScope.modal.hide();
        };
        modalScope.$on('modal.hidden', function(thisModal) {
          var modalScopeId;
          if (thisModal.currentScope) {
            modalScopeId = thisModal.currentScope.$id;
            if (thisScopeId === thisModal.currentScope.$id) {
              dfd.resolve(null);
              return _cleanup(thisModal.currentScope);
            }
          }
        });
        if (angular.isObject(controller)) {
          modalScope.vm = ctrlInstance = controller;
          same = modalScope.vm === modalScope.modal.scope.vm;
          ctrlInstance['openModal'] = modalScope.openModal;
          ctrlInstance['closeModal'] = modalScope.closeModal;
        } else {
          locals = {
            '$scope': modalScope,
            'parameters': parameters
          };
          ctrlEval = _evalController(controller);
          if (ctrlEval.controllerName) {
            ctrlInstance = $controller(controller, locals);
          }
          if (ctrlEval.isControllerAs && ctrlInstance) {
            ctrlInstance['openModal'] = modalScope.openModal;
            ctrlInstance['closeModal'] = modalScope.closeModal;
          }
        }
        if (parameters != null) {
          angular.extend(modalScope, parameters);
        }
        return modalScope.modal.show().then(function() {
          modalScope.$broadcast('modal.afterShow', modalScope.modal);
          return typeof options.modalCallback === "function" ? options.modalCallback(modal) : void 0;
        });
      }, function(err) {
        return dfd.reject(err);
      });
      return dfd.promise;
    };
    _cleanup = function(scope) {
      scope.$destroy();
      if (scope.modal) {
        scope.modal.remove();
      }
    };
    _evalController = function(ctrlName) {
      var fragments, result;
      if (ctrlName == null) {
        ctrlName = '';
      }
      result = {
        isControllerAs: false,
        controllerName: '',
        propName: ''
      };
      fragments = ctrlName.trim().split(/\s+/);
      result.isControllerAs = fragments.length === 3 && (fragments[1] || '').toLowerCase() === 'as';
      if (result.isControllerAs) {
        result.controllerName = fragments[0];
        result.propName = ctrlName;
      } else {
        result.controllerName = ctrlName;
      }
      return result;
    };
    return {
      show: show
    };
  };

  ReusableModal.$inject = ['$ionicModal', '$rootScope', '$q', '$injector', '$controller'];

  angular.module('geocode.components')
    .factory('appModalSvc', ReusableModal);

}).call(this);
