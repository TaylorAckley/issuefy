;(function() {

    angular
      .module('issuefy')
      .controller('SignupCtrl', SignupCtrl);

    SignupCtrl.$inject = ['$scope', '$http', '$location', 'LocalStorage', 'QueryService', '$auth', 'toastr'];


    function SignupCtrl($scope, $http, $location, LocalStorage, QueryService, $auth, toastr) {

      $scope.signup = function() {
        $auth.signup($scope.user)
          .then(function(response) {
            $auth.setToken(response);
            $location.path('/');
            toastr.info('You have successfully created a new account and have been signed-in');
          })
          .catch(function(response) {
            toastr.error(response.data.message);
          });
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
