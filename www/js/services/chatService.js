'use strict';

app.factory('ChatService', function($http, $rootScope, $q, Config) {

  return {
    createChat: function(uid) {
      var data = {
        owners: [$rootScope.user._id, uid]
      }
      return $q(function(resolve, reject) {
        $http.post(Config.apiEndpoint() + 'api/v1/chats',
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
    },
    getChatByCid: function(cid) {
      return $q(function(resolve, reject) {
        $http.get(`${Config.apiEndpoint()}api/v1/chats/${cid}`, {
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
    },
    removeChatByCid: function(cid) {
      return $q(function(resolve, reject) {
        $http.delete(`${Config.apiEndpoint()}api/v1/chats/${cid}`, {
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
    },
    getChatsByUid: function(uid) {
      return $q(function(resolve, reject) {
        $http.get(`${Config.apiEndpoint()}api/v1/${uid}/chats`, {
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
    },
    getUnreadChatsByUid: function(uid) {
      return $q(function(resolve, reject) {
        $http.get(`${Config.apiEndpoint()}api/v1/${uid}/unread-chats`, {
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
    },
    createChatMessage: function(message) {
      return $q(function(resolve, reject) {
        $http.post(Config.apiEndpoint() + 'api/v1/chats/' + message.chat + '/messages',
          message,
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
    },
    getMessagesByCid: function(cid) {
      return $q(function(resolve, reject) {
        $http.get(`${Config.apiEndpoint()}api/v1/chats/${cid}/messages`, {
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
    },
    blockChat: function(cid, isBlock) {
      return $q(function(resolve, reject) {
        $http.put(`${Config.apiEndpoint()}api/v1/chats/${cid}`, {
          action: isBlock ? 'block' : 'unblock'
        }, {
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
