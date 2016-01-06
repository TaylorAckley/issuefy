;(function() {

  angular
    .module('issuefy')
    .factory('Account', Account);

  Account.$inject = ['$http', 'LocalStorage'];


  ////////////


  function Account($http, LocalStorage) {

    return {
          getUser: function() {
            return $http.get('/api/me');
          },
          updateProfile: function(profileData) {
            return $http.put('/api/me', profileData);
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
