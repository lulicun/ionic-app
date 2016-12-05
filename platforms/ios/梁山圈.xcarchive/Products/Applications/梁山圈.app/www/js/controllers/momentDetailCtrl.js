'use strict';

app.controller('MomentDetailCtrl', function($scope, $state, $rootScope, $stateParams, PostService) {

    var objectInArray = function(arr, attr, val) {
        for (var i = 0; i < arr.length; i++) {
            if(_.get(arr[i], attr) == val) return true;
        }
        return false;
    }

    PostService.getById($stateParams.pid).then(function(data) {
        data.created_at_from_now = moment(new Date(data.created_at)).fromNow();
        $scope.post = data
        $scope.images = data.images
    }, function(err) {
        console.log(err)
    });

    $scope.addLike = function(post) {
        if (objectInArray(post.likes, 'from._id', $rootScope.user._id)) return;
        PostService.like(post).then(function(data) {
            post.likes.push({
                from: {
                    _id: $rootScope.user._id,
                    username: $rootScope.user.username,
                    nickname: $rootScope.user.nickname,
                    face: $rootScope.face
                }
            });
        }, function(err) {});
    };

    $scope.addComment = function(post) {
        if(post.newComment && post.newComment.content && post.newComment.content.split(':')[1] != ' ') {
            if (post.newComment.to && post.newComment.content.split(':')[0] != `@${post.newComment.to.nickname}`) {
                post.newComment.to = null
            }
            PostService.comment(post).then(function(data) {
                post.comments.push({
                    from: {
                        _id: $rootScope.user._id,
                        username: $rootScope.user.username,
                        nickname: $rootScope.user.nickname,
                        face: $rootScope.user.face
                    },
                    to: post.newComment.to || null,
                    text: post.newComment.content
                });
                post.newComment = null;
            }, function(err) {});
        }
    };

    $scope.replyComment = function(post, comment) {
        post.newComment = {
            content: `@${comment.from.nickname}: `,
            to: comment.from
        }
        post.autoFocus = true;
    }
});
