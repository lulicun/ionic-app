'use strict'

app.controller('UserMomentCtrl', function($scope, $state, $rootScope, $stateParams, PostService) {
	console.log($stateParams.uid)
	PostService.getByUid($stateParams.uid).then(function(data) {
		console.log(data)
	}, function(err) {

	})
})