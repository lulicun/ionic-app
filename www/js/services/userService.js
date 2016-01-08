'use strict';
// TODO: hard code api endpoint for now, MOVE that into config file
app.factory('UserService', function($http, $q) {

  return {
    signUp: function(data) {
      return $q(function(resolve, reject) {
        $http.post('http://localhost:8090/signup', data)
          .success(function(data, status, headers, config) {
            resolve(data);
          })
          .error(function(data, status, headers, config) {
            reject(data);
          });
      });
    }
  };
});
