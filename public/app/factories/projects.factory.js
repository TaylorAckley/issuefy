;(function() {

  angular
    .module('issuefy')
    .factory('Projects', Projects);

  Projects.$inject = ['$http', 'LocalStorage'];


  ////////////


  function Projects($http, LocalStorage) {

    return {
          getProjects: function() {
            return $http.get('/api/projects');
          },
          getProjectFields: function(prefix) {
            return $http.get('/api/project/fields', {params: {prefix: prefix}});
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
