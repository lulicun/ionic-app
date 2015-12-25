'use strict';

app.controller('MomentCtrl', function($scope, PostService) {
    $scope.posts = PostService.all();

    $scope.addLike = function(post) {
        console.log(post);
        post.likes.push({uid: '123', username: 'hello'});
    };
});
