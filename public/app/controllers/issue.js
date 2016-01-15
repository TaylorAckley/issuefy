;(function() {

    angular
      .module('issuefy')
      .controller('IssueCtrl', IssueCtrl)
      .controller('NewIssueCtrl', NewIssueCtrl);

    IssueCtrl.$inject = ['$scope', '$http', '$location', '$stateParams', 'LocalStorage', 'QueryService', 'Issues', 'Projects', 'projectContext'];
    NewIssueCtrl.$inject = ['$scope', '$http', '$location', '$stateParams', 'LocalStorage', 'QueryService', 'Issues', 'Projects'];


    function IssueCtrl($scope, $http, $location, $stateParams, LocalStorage, QueryService, Issues, Projects, projectContext) {
      $scope.getIssue = Issues.getIssue(projectContext._id, $stateParams.number)
          .then(function(response) {
            console.log(response.data);
            $scope.issue = response.data;
          })
          .catch(function(response) {
            toastr.error(response.data.message, response.status);
          });
    }

    function NewIssueCtrl($scope, $http, $location, $stateParams, LocalStorage, QueryService, Issues, Projects) {
      var self = this;

      $scope.data = {
        project: null
      };

      $scope.getProjects = Projects.getProjects()
          .then(function(response) {
            console.log(response.data);
            $scope.projects = response.data;
          })
          .catch(function(response) {
            toastr.error(response.data.message, response.status);
          });

          $scope.getProjectFields =  function() {
          Projects.getProjectFields($scope.data.project)
              .then(function(response) {
                console.log(response.data);
                $scope.fields = response.data;
              })
              .catch(function(response) {
                toastr.error(response.data.message, response.status);
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
