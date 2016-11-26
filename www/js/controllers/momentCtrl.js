'use strict';

app.controller('MomentCtrl', function($scope, $rootScope, $state, $stateParams, $ionicPlatform, $ionicLoading, $ionicActionSheet, $ionicPopup, PostService) {
	$scope.posts = [];
	$scope.newComments = [];

	PostService.getTwenty((new Date()).getTime()).then(function(data) {
		data.map(function(item){
         	item.created_at_from_now = moment(new Date(item.created_at)).fromNow();
         	$scope.posts.push(item)
        })
	}, function(error) {});
	if ($rootScope.user) {
		PostService.getNewComment().then(function(data) {
			$scope.newComments = data.comments;
		}, function(error) {});
	}

	$rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
		if(toState.name == 'tab.moment' && Object.keys(toParams).length !== 0 && $scope.posts.length > 0){
			PostService.getNew((new Date($scope.posts[0].created_at)).getTime()).then(function(data) {
				$scope.posts.unshift.apply($scope.posts, addAttribute(data));
			}, function(error) {});
		  $stateParams.updated = false;
		}
	});

	$ionicPlatform.on('resume', function(){
      	PostService.getTwenty((new Date()).getTime()).then(function(data) {
			$scope.posts = [];
			data.map(function(item){
				item.created_at_from_now = moment(new Date(item.created_at)).fromNow();
				$scope.posts.push(item)
	        });
	        $ionicLoading.hide();
		}, function(error) {
			$ionicLoading.show({
				template: '网络错误...'
	        });
	        setTimeout(function() {
				$ionicLoading.hide();
	        }, 3000);
		});
		if ($rootScope.user) {
			PostService.getNewComment().then(function(data) {
				$scope.newComments = data.comments;
			}, function(error) {});
		}
    });

	$scope.refresh = function() {
		$ionicLoading.show({
			template: '求其一等...'
        });
		PostService.getTwenty((new Date()).getTime()).then(function(data) {
			$scope.posts = [];
			data.map(function(item){
				item.created_at_from_now = moment(new Date(item.created_at)).fromNow();
				$scope.posts.push(item)
	        });
	        $ionicLoading.hide();
		}, function(error) {
			$ionicLoading.show({
				template: '网络错误...'
	        });
	        setTimeout(function() {
				$ionicLoading.hide();
	        }, 3000);
		});
		if ($rootScope.user) {
			PostService.getNewComment().then(function(data) {
				$scope.newComments = data.comments;
			}, function(error) {});
		}
	}

	$scope.getNew = function() {
		$ionicLoading.show({
          	template: '求其一等...'
        });
        var timePoint = $scope.posts[0] ? (new Date($scope.posts[0].created_at)) : (new Date())
		PostService.getNew(timePoint.getTime()).then(function(data) {
			data.map(function(item){
	         	item.created_at_from_now = moment(new Date(item.created_at)).fromNow();
	         	$scope.posts.unshift(item)
	        })
			$ionicLoading.hide();
		}, function(error) {
			$ionicLoading.show({
				template: '网络错误...'
	        });
	        setTimeout(function() {
				$ionicLoading.hide();
	        }, 3000);
		});
		PostService.getNewComment().then(function(data) {
			$scope.newComments = data.comments;
		}, function(error) {});
	}

	$scope.getMore = function() {
		PostService.getTwenty((new Date($scope.posts[$scope.posts.length-1].created_at)).getTime()).then(function(data) {
			$scope.posts.push.apply($scope.posts, addAttribute(data));
		}, function(error) {});
	}

	$scope.createPost = function() {
		if ($rootScope.isLoggedIn) {
			$state.go('tab.moment-create');
		} else {
			var myPopup = $ionicPopup.show({
				template: '<p>只有登录后，老少爷们才知道是你发哩状态呀!</p>',
				title: '登录后才能发到梁山圈',
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
	}

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

	$scope.toggleComments = function(post) {
		post.showComments = !post.showComments;
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

	$scope.openNewComments = function() {
		$scope.newComments = [];
		PostService.removeNewComment();
		$state.go('tab.moment-comment');
	};

	$scope.openUserMoments = function(user) {
		$state.go('tab.moment-userMoment', {uid: user._id, title: user.nickname || user.username});
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

	var addAttribute = function(data) {
		for (var i = 0; i < data.length; i++) {
			data[i].created_at_from_now = moment(new Date(data[i].created_at)).fromNow();
		}
		return data;
	}

	var objectInArray = function(arr, attr, val) {
		for (var i = 0; i < arr.length; i++) {
			if(_.get(arr[i], attr) == val) return true;
		}
		return false;
	}
});
