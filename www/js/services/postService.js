'use strict';

app.factory('PostService', function($http, $rootScope, $q, Config) {
  // Might use a resource here that returns a JSON array
  var newComments = null;
  return {
    create: function(data) {
      if (data.images.length > 0) {
        data.images = JSON.stringify(data.images);
      } else {
        delete data.images;
      }
      return $q(function(resolve, reject) {
        $http.post(Config.apiEndpoint() + 'api/v1/posts',
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
    all: function() {
      return $q(function(resolve, reject) {
        $http.get(Config.apiEndpoint() + 'posts')
        .success(function(data, status, headers, config) {
          resolve(data);
        })
        .error(function(data, status, headers, config) {
          reject(data);
        });
      });
    },
    getTwenty: function(created_at) {
      return $q(function(resolve, reject) {
        $http.get(Config.apiEndpoint() + 'twenty-posts/' + created_at)
        .success(function(data, status, headers, config) {
          resolve(data);
        })
        .error(function(data, status, headers, config) {
          reject(data);
        });
      });
    },
    getNew: function(from_now) {
      return $q(function(resolve, reject) {
        $http.get(Config.apiEndpoint() + 'new-posts/' + from_now)
        .success(function(data, status, headers, config) {
          resolve(data);
        })
        .error(function(data, status, headers, config) {
          reject(data);
        });
      });
    },
    getById: function(pid) {
      return $q(function(resolve, reject) {
        $http.get(Config.apiEndpoint() + 'posts/' + pid)
        .success(function(data, status, headers, config) {
          resolve(data);
        })
        .error(function(data, status, headers, config) {
          reject(data);
        });
      });
    },
    getByUid: function(uid) {
      return $q(function(resolve, reject) {
        $http.get(Config.apiEndpoint() + `users/${uid}/posts`)
        .success(function(data, status, headers, config) {
          resolve(data);
        })
        .error(function(data, status, headers, config) {
          reject(data);
        });
      });
    },
    removeById: function(pid) {
      return $q(function(resolve, reject) {
        $http.delete(Config.apiEndpoint() + `api/v1/posts/${pid}`, {
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
    like: function(post) {
      return $q(function(resolve, reject) {
        $http.post(Config.apiEndpoint() + 'api/v1/posts/' + post._id + '/likes',
          {
            like_from: $rootScope.user._id
          },
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
    comment: function(post) {
      return $q(function(resolve, reject) {
        $http.post(Config.apiEndpoint() + 'api/v1/posts/' + post._id + '/comments',
          {
            text: post.newComment.content,
            comment_from: $rootScope.user._id,
            reply_to: post.newComment.to ? post.newComment.to._id : null
          },
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
    getNewComment: function() {
      return $q(function(resolve, reject) {
        $http.get(Config.apiEndpoint() + 'api/v1/new-comments/' + $rootScope.user._id, {
            headers: {
              'pk': $rootScope.keys.pk,
              'sk': $rootScope.keys.sk
            }
        })
        .success(function(data, status, headers, config) {
          if (data) {
            newComments = data.comments;
          }
          resolve(data);
        })
        .error(function(data, status, headers, config) {
          reject(data);
        });
      });
    },
    removeNewComment: function() {
      return $q(function(resolve, reject) {
        $http.delete(Config.apiEndpoint() + 'api/v1/new-comments/' + $rootScope.user._id, {
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
    newComments: function() {
      return newComments;
    }
  };
});
