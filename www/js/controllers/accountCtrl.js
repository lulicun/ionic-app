'use strict';

app.controller('AccountCtrl', function($scope, $rootScope, $state, $ionicActionSheet, $ionicHistory, $cordovaCamera, $localStorage, UserService) {
	$scope.account = Object.assign({}, $rootScope.user); // Object clone

	$scope.settings = {
		enableFriends: true
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
	}

	$scope.signOut = function() {
		$rootScope.isLoggedIn = false;
		$localStorage.clear();
		$ionicHistory.clearCache();
		$ionicHistory.clearHistory();
		$state.go('tab.moment');
	}

	$scope.updateNickname = function(accountForm) {
		if (!accountForm.nickname.$valid) {
			$scope.errorMsg = accountForm.nickname.$error.maxlength ? "你这个名忒长！" : "咋咋都得给个名哎！";
			setTimeout(function(){
				$scope.$apply(function(){
					$scope.errorMsg = false;
					$scope.account.nickname = $rootScope.user.nickname;
    		});
			}, 2000);
		} else if ($scope.account.nickname != $rootScope.user.nickname) {
			UserService.update($rootScope.user._id, {
				nickname: $scope.account.nickname
			}).then(function(result) {
				$rootScope.user.nickname = $scope.account.nickname;
				$localStorage.setObject('user', $rootScope.user);
			}, function(err) {
				console.log('err', err);
				$scope.account.nickname = $rootScope.user.nickname;
			})
		}
	}

	$scope.updateEmail = function(accountForm) {
		if (!accountForm.email.$valid) {
			$scope.errorMsg = "你给哩邮箱格式不对，再想想吧！";
			setTimeout(function(){
				$scope.$apply(function(){
					$scope.errorMsg = false;
					$scope.account.email = $rootScope.user.email;
    		});
			}, 2000);
		} else if ($scope.account.email != $rootScope.user.email) {
			UserService.update($rootScope.user._id, {
				email: $scope.account.email
			}).then(function(result) {
				$rootScope.user.email = $scope.account.email;
				$localStorage.setObject('user', $rootScope.user);
			}, function(err) {
				console.log('err', err);
				$scope.account.email = $rootScope.user.email;
			});
		}
	}

	$scope.updatePhone = function(accountForm) {
		var reg = /^1[0-9]{10}$|^[569][0-9]{7}$/;
		if (!accountForm.phone.$valid || !reg.test($scope.account.phone)) {
			$scope.errorMsg = "你给哩手机号码格式都错啦，再想想吧！";
			setTimeout(function(){
				$scope.$apply(function(){
					$scope.errorMsg = false;
					$scope.account.phone = $rootScope.user.phone;
    		});
			}, 2000);
		} else if ($scope.account.phone != $rootScope.user.phone) {
			UserService.update($rootScope.user._id, {
				phone: $scope.account.phone
			}).then(function(result) {
				$rootScope.user.phone = $scope.account.phone;
				$localStorage.setObject('user', $rootScope.user);
			}, function(err) {
				console.log('err', err);
			});
		}
	}

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
	}

	var openPhotoLibrary = function() {
		var options = {
			quality : 75,
			destinationType : Camera.DestinationType.DATA_URL,
			sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit : true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 300,
			targetHeight: 300,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};
		getPicture(options);
	}

	var getPicture = function(options) {
		$cordovaCamera.getPicture(options).then(function(imageData) {
			var face = "data:image/jpeg;base64," + imageData;
			UserService.update($rootScope.user._id, {
				face: face
			}).then(function(result) {
				$rootScope.user.face = face;
				$scope.account.face = face;
				$localStorage.setObject('user', $rootScope.user);
			}, function(err) {

			});
		}, function(err) {
			// An error occured. Show a message to the user
		});
	}
});
