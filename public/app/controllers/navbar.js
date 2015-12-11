;(function() {

    angular
      .module('issuefy')
      .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['$scope', '$http', '$location', 'LocalStorage', 'QueryService', '$auth', 'toastr'];

    function NavbarCtrl($scope, $http, $location, LocalStorage, QueryService, $auth, toastr) {
      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

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
