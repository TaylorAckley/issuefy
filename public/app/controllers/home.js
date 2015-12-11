;(function() {

    angular
      .module('issuefy')
      .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$http', '$location', 'LocalStorage', 'QueryService'];


    function HomeCtrl($scope, $http, $location, LocalStorage, QueryService) {
      $http.jsonp('https://api.github.com/repos/sahat/satellizer?callback=JSON_CALLBACK')
        .success(function(data) {
          if (data) {
            if (data.data.stargazers_count) {
              $scope.stars = data.data.stargazers_count;
            }
            if (data.data.forks) {
              $scope.forks = data.data.forks;
            }
            if (data.data.open_issues) {
              $scope.issues = data.data.open_issues;
            }
          }
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
