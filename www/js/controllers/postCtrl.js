'use strict';

app.controller('PostCtrl', function($scope, $rootScope, $stateParams, PostService) {
    var pid = $stateParams.pid;

    PostService.getById(pid).then(function(post) {
        $scope.post = post;
    }, function(err) {});

    //Didsplay back button
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });
})
