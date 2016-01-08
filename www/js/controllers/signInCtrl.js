'use strict';

app.controller('SignInCtrl', function($scope, $rootScope, $state) {

	$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
		viewData.enableBack = true;
	});

    $scope.user = {
        username: $rootScope.username,
        password: ''
    }

    console.log($scope.user);

	$scope.signIn = function(user) {
		console.log('Sign-In', user);
		$state.go('tabs.home');
	};

})
