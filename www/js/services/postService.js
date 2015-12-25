'use strict';

app.factory('PostService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var posts = [{
    content: "hello michael",
    created_at: moment(new Date("2015-12-24T04:01:18.828Z")).fromNow(),
    id: "567b6e0e990c04114e3d3fff",
    images: [{src: 'img/i1.jpg'}, {src: 'img/i2.jpg'}, {src: 'img/i3.jpg'}, {src: 'img/i4.jpg'}, {src: 'img/i1.jpg'}, {src: 'img/i2.jpg'}, {src: 'img/i3.jpg'}, {src: 'img/i4.jpg'}],
    user:{
      uid: "567a11bc6d7ca1142e8e2640",
      username: "michael@bond.co",
      face: 'img/ben.png'
    },
    likes: [
      {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co"
      }
    ],
    comments: [
      {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co",
        content: '太牛逼了',
        created_at: "2015-12-23T04:01:18.828Z"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co",
        content: '赞一个',
        created_at: "2015-12-23T04:01:18.828Z"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co",
        content: '梁山圈不孬',
        created_at: "2015-12-23T04:01:18.828Z"
      }
    ]
  }, {
    content: "hello emily",
    created_at: moment(new Date("2015-12-23T04:01:18.828Z")).fromNow(),
    id: "567b6e0e990c04114e3d3ffe",
    images: [{src: 'img/i2.jpg', sub: 'hello emily'}],
    user:{
      uid: "567a11bc6d7ca1142e8e2640",
      username: "michael@bond.co",
      face: 'img/max.png'
    },
    likes: [
      {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co"
      }
    ],
    comments: [
      {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co",
        content: '太牛逼了',
        created_at: "2015-12-23T04:01:18.828Z"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co",
        content: '赞一个',
        created_at: "2015-12-23T04:01:18.828Z"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co",
        content: '梁山圈不孬',
        created_at: "2015-12-23T04:01:18.828Z"
      }
    ]
  }, {
    content: "hello melody",
    created_at: moment(new Date("2015-12-24T22:01:18.828Z")).fromNow(),
    id: "567b6e0e990c04114e3d3ffc",
    images: [{src: 'img/i3.jpg'}, {src: 'img/i4.jpg'}],
    user:{
      uid: "567a11bc6d7ca1142e8e2640",
      username: "michael@bond.co",
      face: 'img/perry.png'
    },
    likes: [
      {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co"
      }
    ],
    comments: [
      {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co",
        content: '太牛逼了',
        created_at: "2015-12-23T04:01:18.828Z"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co",
        content: '赞一个',
        created_at: "2015-12-23T04:01:18.828Z"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co",
        content: '梁山圈不孬',
        created_at: "2015-12-23T04:01:18.828Z"
      }
    ]
  }, {
    content: "hello mat",
    created_at: moment(new Date("2015-11-24T04:01:18.828Z")).fromNow(),
    id: "567b6e0e990c04114e3d3ffa",
    images: [],
    user:{
      uid: "567a11bc6d7ca1142e8e2640",
      username: "michael@bond.co",
      face: 'img/perry.png'
    },
    likes: [
      {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co"
      }
    ],
    comments: [
      {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co",
        content: '太牛逼了',
        created_at: "2015-12-23T04:01:18.828Z"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co",
        content: '赞一个',
        created_at: "2015-12-23T04:01:18.828Z"
      }, {
        uid: "567a11bc6d7ca1142e8e2640",
        username: "michael@bond.co",
        content: '梁山圈不孬',
        created_at: "2015-12-23T04:01:18.828Z"
      }
    ]
  }];

  return {
    all: function() {
      return posts;
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
