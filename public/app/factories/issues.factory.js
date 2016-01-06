;(function() {

  angular
    .module('issuefy')
    .factory('Issues', Issues);

  Issues.$inject = ['$http', 'LocalStorage'];


  ////////////


  function Issues($http, LocalStorage) {

    return {
          getIssues: function() {
            return $http.get('/api/issues');
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
