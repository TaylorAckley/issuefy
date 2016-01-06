;(function() {

    angular
      .module('issuefy')
      .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['$scope', '$http', '$location', 'LocalStorage', 'QueryService', '$auth', 'toastr', 'Account'];

    function NavbarCtrl($scope, $http, $location, LocalStorage, QueryService, $auth, toastr, Account) {

      $scope.getNavUser = Account.getUser()
          .then(function(response) {
            $scope.userNav = response.data;
          })
          .catch(function(response) {
            toastr.error(response.data.message, response.status);
          });


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
