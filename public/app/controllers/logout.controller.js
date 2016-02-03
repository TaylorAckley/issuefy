;(function() {

    angular
      .module('issuefy')
      .controller('LogoutCtrl', LogoutCtrl);

    LogoutCtrl.$inject = ['$scope', '$http', '$location', 'LocalStorage', 'QueryService', '$auth', 'toastr'];

    function LogoutCtrl($scope, $http, $location, LocalStorage, QueryService, $auth, toastr) {
      if (!$auth.isAuthenticated()) { return; }
      $auth.logout()
        .then(function() {
          toastr.info('You have been logged out');
          $location.path('/');
        });


      ////////////  function definitions


      /**
       * Load some data
       * @return {Object} Returned object
       */
      // QueryService.query('GET', 'posts', {}, {})
      //   .then(function(ovocie) {
      //     self.ovocie = ovocie.data;
      //   });
    }
  })();
