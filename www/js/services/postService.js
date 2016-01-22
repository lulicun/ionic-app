'use strict';

app.factory('PostService', function($http, $rootScope, $q, Config) {
  // Might use a resource here that returns a JSON array

  return {
    create: function(data) {
      if (data.images.length > 0) {
        data.images = JSON.stringify(data.images);
      } else {
        delete data.images;
      }
      console.log(data);
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
            text: post.newComment,
            comment_from: $rootScope.user._id,
            reply_to: post.reply_to
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



    remove: function(post) {
      posts.splice(posts.indexOf(post), 1);
    },
    get: function(postId) {
      for (var i = 0; i < posts.length; i++) {
        if (posts[i].id === parseInt(postId)) {
          return posts[i];
        }
      }
      return null;
    }
  };
});
