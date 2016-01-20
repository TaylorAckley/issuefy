;(function() {

  angular
    .module('issuefy')
    .factory('Issues', Issues);

  Issues.$inject = ['$http', 'LocalStorage'];


  ////////////


  function Issues($http, LocalStorage) {

    return {

          createIssue: function(newIssue) {
            return $http.post('/api/issue/create', newIssue);
          },
          getIssues: function() {
            return $http.get('/api/issues');
          },
          getIssue: function(project, number) {
            return $http.get('/api/issue', {
              params: {
                project: project,
                number: number
              }
            });
          }


        };


    ////////////  function definitions


    /**
     * Load articles from GetPocket API
     * @return {Object} Articles object
     */
    // var request = {
    //   consumer_key: 'xxxx',
    //   access_token: 'xxxx',
    //   sort: 'newest',
    //   count: 5
    // };

    // return $http({
    //   method: 'GET',
    //   url: API.url + 'v3/get',
    //   params: request
    // }).then(function(articles) {
    //   return articles.data;
    // })
    // .catch(function(error) {
    //   return error;
    // });
  }


})();
