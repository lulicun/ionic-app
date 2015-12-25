'use strict';

app.controller('MomentCreateCtrl', function($scope, $ionicActionSheet) {
	$scope.createMoment = function() {
		console.log("Creating moment");
	};

	var hideSheet = null;
	$scope.addImages = function() {
		console.log("add images ...");
		hideSheet = $ionicActionSheet.show({
			buttons: [
			 	{ text: '拍照' },
			 	{ text: '从手机相册选择' }
			],
			//destructiveText: 'Delete',
			titleText: '选择照片',
			cancelText: '取消',
			cancel: function() {
				// add cancel code..
			},
			buttonClicked: function(index) {
				console.log(index);
			 	return true;
			}
		});
	};
});
