'use strict'

app.controller('UserMomentCtrl', function($scope, $state, $rootScope, $stateParams, $ionicPopup, PostService, ChatService) {
    $scope.posts = []

    $scope.title = $stateParams.title

	PostService.getByUid($stateParams.uid).then(function(data) {
        data.map(function(item){
            item.created_at_from_now = moment(new Date(item.created_at)).fromNow();
            $scope.posts.push(item)
        });
	}, function(err) {});

    function loginConfirm() {
        $ionicPopup.show({
            template: '<p>需要登录才行哩！</p>',
            title: '需要登录',
            subTitle: '登录请求',
            scope: $scope,
            buttons: [
                { text: '算啦！' },
                {
                    text: '<b>去登录！</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $state.go('signin');
                    }
                }
            ]
        });
    }

    $scope.addLike = function(post) {
        if(!$rootScope.user) {
            loginConfirm()
            return
        }
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
        if(!$rootScope.user) {
            loginConfirm()
            return
        }
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
        $ionicPopup.show({
            template: '<p>你真想删除呗？</p>',
            title: '请确认',
            scope: $scope,
            buttons: [
                {
                    text: '按错啦！',
                    type: 'button-positive',
                },
                {
                    text: '<b>删啦！</b>',
                    onTap: function(e) {
                        _.remove($scope.posts, post)
                        PostService.removeById(post._id)
                    }
                }
            ]
        });
    }

    $scope.openUserMoments = function(user) {
        $state.go('tab.moment-userMoment', {uid: user._id, title: user.nickname || user.username});
    }

    $scope.createChat = function(poster) {
        if(!$rootScope.user) {
            loginConfirm()
            return
        }
        ChatService.createChat(poster._id).then(function(data) {
            $rootScope.redirectToChatId = data.chat._id
            $state.go('tab.chats')
        }, function(err) {
            console.log(err)
        })
    }

    var objectInArray = function(arr, attr, val) {
        for (var i = 0; i < arr.length; i++) {
            if(_.get(arr[i], attr) == val) return true;
        }
        return false;
    }
})
