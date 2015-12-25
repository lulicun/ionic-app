'use strict';

app.controller('MomentCtrl', function($scope, PostService) {
    $scope.posts = PostService.all();
});
