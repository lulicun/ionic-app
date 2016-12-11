'use strict';

app.controller('SignUpCtrl', function($scope, $rootScope, $state, $ionicLoading, $ionicPopup, UserService) {
    //Didsplay back button
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });

    $scope.readAndAgree = true

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

    $scope.serviceTerms = function() {
        var myPopup = $ionicPopup.show({
            templateUrl: '../templates/service-terms.html',
            title: '梁山圈软件服务协议',
            subTitle: '',
            scope: $scope,
            buttons: [
              { text: '关闭' }
            ]
        });
    }

    $scope.privacyPolice = function() {
        var myPopup = $ionicPopup.show({
            templateUrl: '../templates/privacy-police.html',
            title: '梁山圈隐私政策',
            subTitle: '',
            scope: $scope,
            buttons: [
              { text: '关闭' }
            ]
        });
    }

    $scope.usageRules = function() {
        var myPopup = $ionicPopup.show({
            templateUrl: '../templates/usage-rules.html',
            title: '梁山圈个人帐号使用规范',
            subTitle: '',
            scope: $scope,
            buttons: [
              { text: '关闭' }
            ]
        });
    }

})
