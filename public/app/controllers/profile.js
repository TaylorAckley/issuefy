;(function() {

    angular
      .module('issuefy')
      .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', '$http', '$location', 'LocalStorage', 'QueryService', '$auth', 'toastr', 'Account'];


    function ProfileCtrl($scope, $http, $location, LocalStorage, QueryService, $auth, toastr, Account) {

      $scope.getProfile = function() {
        Account.getProfile()
          .then(function(response) {
            $scope.user = response.data;
          })
          .catch(function(response) {
            toastr.error(response.data.message, response.status);
          });
      };
      $scope.updateProfile = function() {
        Account.updateProfile($scope.user)
          .then(function() {
            toastr.success('Profile has been updated');
          })
          .catch(function(response) {
            toastr.error(response.data.message, response.status);
          });
      };
      $scope.link = function(provider) {
        $auth.link(provider)
          .then(function() {
            toastr.success('You have successfully linked a ' + provider + ' account');
            $scope.getProfile();
          })
          .catch(function(response) {
            toastr.error(response.data.message, response.status);
          });
      };
      $scope.unlink = function(provider) {
        $auth.unlink(provider)
          .then(function() {
            toastr.info('You have unlinked a ' + provider + ' account');
            $scope.getProfile();
          })
          .catch(function(response) {
            toastr.error(response.data ? response.data.message : 'Could not unlink ' + provider + ' account', response.status);
          });
      };

      $scope.getProfile();

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
