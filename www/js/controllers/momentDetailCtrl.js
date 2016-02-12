'use strict';

app.controller('MomentDetailCtrl', function($scope, $state, $rootScope, $stateParams, PostService) {
    PostService.getById($stateParams.pid).then(function(data) {
        data.created_at_from_now = moment(new Date(data.created_at)).fromNow();
        $scope.post = data
        $scope.images = data.images
    }, function(err) {
        console.log(err)
    });

    $scope.addComment = function(post) {
        if(post.newComment) {
            PostService.comment(post).then(function(data) {
                post.comments.push({
                    from: {
                        _id: $rootScope.user._id,
                        username: $rootScope.user.username,
                        nickname: $rootScope.user.nickname,
                        face: $rootScope.user.face
                    },
                    to: {

                    },
                    text: post.newComment
                });
                post.newComment = null;
            }, function(err) {});
        }
    };
});
