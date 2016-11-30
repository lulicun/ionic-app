'use strict';

app.factory('ChatService', function($http, $rootScope, $q, Config) {
  var messages = [{
    id: 1,
    chat: 0,
    content: 'hi',
    from: '123',
    to: '5838d5835ce79400110a6a14',
    status: 'unread'
  },
  {
    id: 2,
    chat: 0,
    content: 'hello',
    from: '123',
    to: '5838d5835ce79400110a6a14',
    status: 'unread'
  }];


  return {
    createChat: function(uid) {
      let data = {
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
    remove: function(chat) {
      //chats.splice(chats.indexOf(chat), 1);
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
    getUnreadMessages: function(chatId, callback) {
      callback(null, messages)
    }
  };
});
