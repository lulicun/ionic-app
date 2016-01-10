'use strict';
// TODO: hard code api endpoint for now, MOVE that into config file
app.factory('UserService', function($http, $q, $rootScope) {

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
    },

    signIn: function(data) {
      return $q(function(resolve, reject) {
        $http.post('http://localhost:8090/signin', data)
        .success(function(data, status, headers, config) {
          resolve(data);
        })
        .error(function(data, status, headers, config) {
          reject(data);
        });
      });
    },

    update: function(query, data) {
      return $q(function(resolve, reject) {
        $http.put('http://localhost:8090/api/v1/users/' + query,
          data,
          {
            headers: {
              'pk': $rootScope.keys.pk,
              'sk': $rootScope.keys.sk
            }
        })
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
