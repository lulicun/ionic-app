'use strict';

app.controller('MomentCtrl', function($scope, $ionicActionSheet, PostService) {
	$scope.posts = PostService.all();

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
