;(function() {

    angular
      .module('issuefy')
      .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$http', '$location', '$stateParams', 'LocalStorage', 'QueryService', 'Issues', 'Projects'];


    function HomeCtrl($scope, $http, $location, $stateParams, LocalStorage, QueryService, Issues, Projects) {

      $scope.getIssues = Issues.getIssues()
          .then(function(response) {
            console.log(response.data);
            $scope.issues = response.data;
          })
          .catch(function(response) {
            toastr.error(response.data.message, response.status);
          });

          $scope.getProjects = Projects.getProjects()
              .then(function(response) {
                $scope.projects = response.data;
              })
              .catch(function(response) {
                toastr.error(response.data.message, response.status);
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
