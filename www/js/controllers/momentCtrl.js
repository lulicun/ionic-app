'use strict';

app.controller('MomentCtrl', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicActionSheet, $ionicPopup, PostService) {
	console.log("moment controller");

	$scope.posts = [];

	PostService.getTwenty((new Date()).getTime()).then(function(data) {
		$scope.posts = addAttribute(data);
	}, function(error) {});

	$rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
		if(toState.name == 'tab.moment' && Object.keys(toParams).length !== 0){
			PostService.getNew((new Date($scope.posts[0].created_at)).getTime()).then(function(data) {
				$scope.posts.unshift.apply($scope.posts, addAttribute(data));
			}, function(error) {});
		  $stateParams.updated = false;
		}
	});

	$scope.getNew = function() {
		$ionicLoading.show({
          	template: '求其一等...'
        });
		PostService.getTwenty((new Date()).getTime()).then(function(data) {
			//TODO: there's an error from ion-gallery when scope is destroyed, should only update changed posts
			$scope.posts = addAttribute(data);
			$ionicLoading.hide();
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
