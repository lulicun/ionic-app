'use strict';

app.controller('SignUpCtrl', function($scope, $rootScope, $state, $ionicLoading, UserService) {
    //Didsplay back button
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });

    $scope.signUp = function(user) {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.close();
        }
        $scope.errorMsg = false;
        $ionicLoading.show({
          template: '注册着哩，求其一等...'
        });
        UserService.signUp({
            username: user.username,
            password: user.password,
            nickname: user.nickname
        }).then(function(result) {
            $scope.success = true;
            $rootScope.username = result.user.username;
            setTimeout(function() {
                $ionicLoading.hide();
                $state.go('signin');
            }, 1000);
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
