'use strict';

app.controller('MomentCtrl', function($scope, $rootScope, $state, $stateParams, $ionicActionSheet, $ionicPopup, PostService) {
	console.log("moment controller");

	PostService.all().then(function(data) {
		for (var i = 0; i < data.length; i++) {
			data[i].created_at = moment(new Date(data[i].created_at)).fromNow();
		}
		$scope.posts = data;
		console.log(data);
	}, function(error) {

	});


	$rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
    if(toState.name == 'tab.moment' && Object.keys(toParams).length !== 0){
			PostService.all().then(function(data) {
				for (var i = 0; i < data.length; i++) {
					data[i].created_at = moment(new Date(data[i].created_at)).fromNow();
				}
				$scope.posts = data;
				console.log(data);
			}, function(error) {

			});
      $stateParams.updated = false;
    }
	});




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
		console.log(post);
		post.likes.push({uid: '123', username: 'hello'});
	};

	$scope.toggleComments = function(post) {
		post.showComments = !post.showComments;
	};

	$scope.addComment = function(post) {
		console.log(post.newComment);
		post.comments.push({
			uid: "567a11bc6d7ca1142e8e2640",
			username: "michael@bond.co",
			content: post.newComment
		});
		post.newComment = null;
	};
});
