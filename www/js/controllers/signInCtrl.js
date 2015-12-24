'use strict';

app.controller('SignInCtrl', function($scope, $state) {
	//Didsplay back button
	$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
		viewData.enableBack = true;
	});

	$scope.signIn = function(user) {
		console.log('Sign-In', user);
		$state.go('tabs.home');
	};

})
