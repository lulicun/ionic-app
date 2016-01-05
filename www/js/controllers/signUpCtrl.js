'use strict';

app.controller('SignUpCtrl', function($scope, $state, $ionicLoading) {
    //Didsplay back button
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });

    $scope.signUp = function(user) {
        $ionicLoading.show({
          template: 'Loading...'
        });
        $ionicLoading.hide();
        console.log('Sign-In', user);
        //$state.go('tabs.home');
    };

})
