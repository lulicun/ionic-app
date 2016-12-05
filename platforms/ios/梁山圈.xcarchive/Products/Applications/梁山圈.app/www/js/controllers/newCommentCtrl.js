'use strict';

app.controller('NewCommentCtrl', function($scope, $state, $rootScope, PostService) {
    $scope.newComments = PostService.newComments();


    $scope.openPost = function(pid) {
        console.log(pid);
    }
});
