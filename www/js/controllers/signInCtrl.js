'use strict';

app.controller('SignInCtrl', function($scope, $rootScope, $ionicLoading, $localstorage, $state, UserService) {

	$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
		viewData.enableBack = true;
	});

	$scope.user = {
		username: $rootScope.username,
		password: ''
	}

	$scope.signIn = function(user) {
		$scope.errorMsg = false;
		$ionicLoading.show({
		  template: '登着哩，求其一等...'
		});
		UserService.signIn({
			username: user.username,
			password: user.password
		}).then(function(result) {
			$scope.success = true;
			$localstorage.setObject('keys', {
				uid: result.keys.uid,
				pk: result.keys.pk,
				sk: result.keys.sk
			});
			$ionicLoading.hide();
			$rootScope.isLoggedIn = true;
			setTimeout(function() {
				$state.go('tab.moment');
			}, 1000);
		}, function(error) {
			switch(error.code) {
				case 500:
					$scope.errorMsg = "不好意思，系统出了点毛病！";
					break;
				case 401:
				default:
					$scope.errorMsg = "号或密码不对，输错了呗是，换个试试吧！";

			}
			$ionicLoading.hide();
		});
	};

})
