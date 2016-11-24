'use strict'

app.controller('UserMomentCtrl', function($scope, $state, $rootScope, $stateParams, PostService) {
    $scope.posts = []

    $scope.title = $stateParams.title

	PostService.getByUid($stateParams.uid).then(function(data) {
        data.map(function(item){
            item.created_at_from_now = moment(new Date(item.created_at)).fromNow();
            $scope.posts.push(item)
        });
	}, function(err) {});


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

    $scope.toggleComments = function(post) {
        post.showComments = !post.showComments;
    };

    $scope.replyComment = function(post, comment) {
        post.newComment = {
            content: `@${comment.from.nickname}: `,
            to: comment.from
        }
        post.autoFocus = true;
    }

    $scope.removeMoment = function(post) {
        _.remove($scope.posts, post)
        PostService.removeById(post._id)
    }

    var objectInArray = function(arr, attr, val) {
        for (var i = 0; i < arr.length; i++) {
            if(_.get(arr[i], attr) == val) return true;
        }
        return false;
    }
})
