'use strict';

app.controller('MomentCtrl', function($scope, $ionicActionSheet, PostService) {
	$scope.posts = PostService.all();

	var hideSheet = null;

	$scope.addPost = function() {
		hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Share</b> This' },
       { text: 'Move' }
     ],
     destructiveText: 'Delete',
     titleText: 'Modify your album',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       return true;
     }
   });
	};

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
