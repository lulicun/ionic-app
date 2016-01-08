'use strict';

app.controller('SignUpCtrl', function($scope, $rootScope, $state, $ionicLoading, UserService) {
    //Didsplay back button
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });

    $scope.signUp = function(user) {
        $scope.errorMsg = false;
        $ionicLoading.show({
          template: 'Loading...'
        });
        UserService.signUp({
            username: user.username,
            password: user.password,
            nickname: user.nickname
        }).then(function(result) {
            console.log(result);
            $scope.success = true;
            $ionicLoading.hide();
            $rootScope.username = result.user.username;
            setTimeout(function() {
                $state.go('signin');
            }, 2000);
        }, function(error) {
            switch(error.code) {
                case 409:
                    $scope.errorMsg = "这个号有人用啦，换个试试呗。";
                    break;
                case 500:
                default:
                    $scope.errorMsg = "不好意思，系统出了点毛病！";

            }
            $ionicLoading.hide();
        });
    };

})
