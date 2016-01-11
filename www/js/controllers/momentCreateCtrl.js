'use strict';

app.controller('MomentCreateCtrl', function($scope, $ionicActionSheet, $cordovaCamera, PostService) {
	$scope.post = {content: '', images: []};
	$scope.createMoment = function() {
		console.log($scope.post);
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
				if (index === 0) {
					openPhotoCamera();
				} else {
					openPhotoLibrary();
				}
				return true;
			}
		});
	};

	var openPhotoCamera = function() {
		var options = {
			quality : 75,
			destinationType : Camera.DestinationType.DATA_URL,
			sourceType : Camera.PictureSourceType.CAMERA,
			allowEdit : true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 300,
			targetHeight: 300,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};
		getPicture(options);
	};

	var openPhotoLibrary = function() {
		window.imagePicker.getPictures(function(results) {
			for (var i = 0; i < results.length; i++) {
				console.log('Image URI: ' + results[i]);
				$scope.post.images.push(results[i]);
			}
			if(!$scope.$$phase) {
				$scope.$apply();
			}
		}, function (error) {
			console.log('Error: ' + error);
		});
	};

	var getPicture = function(options) {
		$cordovaCamera.getPicture(options).then(function(imageData) {
			$scope.post.images.push("data:image/jpeg;base64," + imageData);
		}, function(err) {
			// An error occured. Show a message to the user
		});


				// console.log(imageData);
				// console.log(options);
				//var image = document.getElementById('tempImage');
				//image.src = imageData;

				// var server = "http://yourdomain.com/upload.php",
				//     filePath = imageData;

				// var date = new Date();

				// var options = {
				//     fileKey: "file",
				//     fileName: imageData.substr(imageData.lastIndexOf('/') + 1),
				//     chunkedMode: false,
				//     mimeType: "image/jpg"
				// };

				// $cordovaFileTransfer.upload(server, filePath, options).then(function(result) {
				//     console.log("SUCCESS: " + JSON.stringify(result.response));
				//     console.log('Result_' + result.response[0] + '_ending');
				//     alert("success");
				//     alert(JSON.stringify(result.response));

				// }, function(err) {
				//     console.log("ERROR: " + JSON.stringify(err));
				//     //alert(JSON.stringify(err));
				// }, function (progress) {
				//     // constant progress updates
				// });
	};

});
