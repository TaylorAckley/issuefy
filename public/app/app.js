/**
 *
 * AngularJS Boilerplate
 * @description           Description
 * @author                Jozef Butko // www.jozefbutko.com/resume
 * @url                   www.jozefbutko.com
 * @version               1.1.7
 * @date                  March 2015
 * @license               MIT
 *
 */
;(function() {


  /**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('issuefy', [
      'ngResource',
      'ngMessages',
      'ngAnimate',
      'toastr',
      'ui.router',
      'satellizer',
      'ui.bootstrap'
    ])
    .config(config);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$httpProvider', '$compileProvider', '$stateProvider', '$urlRouterProvider', '$authProvider', '$locationProvider'];

  function config($httpProvider, $compileProvider, $stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'views/home.html',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('issue/create', {
        url: '/issue/create',
        templateUrl: 'views/createIssue.html',
        controller: 'IssueCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      });

      $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

function loginRequired($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }
    return deferred.promise;
  }

// auth providers
    $authProvider.facebook({
      clientId: '657854390977827'
    });


  }


  // the below is deprecated, but if reactivated then inject into config: $httpProvider.interceptors.push('authInterceptor');
  angular
    .module('issuefy')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

  function authInterceptor($rootScope, $q, LocalStorage, $location) {

    return {

      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
                    if (localStorage.get('token')) {
                        config.headers.Authorization = localStorage.get('token');
                    }
        return config;
      },

      // Catch 404 errors
      responseError: function(response) {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }


  /**
   * Run block
   */
  angular
    .module('issuefy')
    .run(run);

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location) {

    // put here everything that you need to run on page load
  }


})();
