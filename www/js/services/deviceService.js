'use strict';

app.factory('DeviceService', function($http, $rootScope, $q, Config) {
  // Might use a resource here that returns a JSON array

  return {
    create: function(data) {
      return $q(function(resolve, reject) {
        $http.post(Config.apiEndpoint() + 'devices', data)
        .success(function(data, status, headers, config) {
          resolve(data);
        })
        .error(function(data, status, headers, config) {
          reject(data);
        });
      });
    },
    addUser: function(uid) {
      return $q(function(resolve, reject) {
        $http.post(Config.apiEndpoint() + 'api/v1/devices/' + $rootScope.device_id,
          {uid: uid},
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
  }
});
