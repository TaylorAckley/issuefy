;(function() {

  angular
    .module('issuefy')
    .factory('Tags', Tags);

  Tags.$inject = ['$http', 'LocalStorage'];


  ////////////


  function Tags($http, LocalStorage) {

    return {
          getTags: function() {
            return $http.get('/api/tags');
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
