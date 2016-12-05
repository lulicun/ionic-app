'use strict';

app.controller('MomentCreateCtrl', function($scope, $state, $rootScope, $q, $ionicLoading, $ionicActionSheet, $cordovaCamera, PostService, UtilService) {
	$scope.post = {uid: $rootScope.user._id, content: '', images: []};
	$scope.createMoment = function() {
		$ionicLoading.show({
		  template: '发布中，求其一等...'
		});
		PostService.create($scope.post)
		.then(function(result) {
			$ionicLoading.hide();
			$state.go('tab.moment', {});
		}, function(error) {
			$ionicLoading.show({
				template: '网络错误...'
	        });
	        setTimeout(function() {
				$ionicLoading.hide();
	        }, 3000);
		});
	}

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
				if (index === 0) {
					openPhotoCamera();
				} else {
					openPhotoLibrary();
				}
				return true;
			}
		});
	}

	var openPhotoCamera = function() {
		var options = {
			quality : 80,
			destinationType : Camera.DestinationType.DATA_URL,
			sourceType : Camera.PictureSourceType.CAMERA,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 800,
			targetHeight: 800,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false,
			correctOrientation: true
		};
		getPicture(options);
	}

	var getPicture = function(options) {
		$cordovaCamera.getPicture(options).then(function(imageData) {
			$scope.post.images.push("data:image/jpeg;base64," + imageData);
		}, function(err) {
			// An error occured. Show a message to the user
		});
	}

	var openPhotoLibrary = function() {
		window.imagePicker.getPictures(function(results) {
			var imageDataTasks = [];
			for (var i = 0; i < results.length; i++) {
				imageDataTasks.push(UtilService.urlToBase64(results[i]));
			}

			$q.all(imageDataTasks).then(function(data) {
				console.log('data:', data);
				$scope.post.images = data;
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			}, function(err) {
				console.log('err', err);
			});
		}, function(err) {
			//TODO: handle errors
		}, {
			maximumImagesCount: 9,
			width: 800,
			height: 800,
			quality: 80
		});
	}

});
