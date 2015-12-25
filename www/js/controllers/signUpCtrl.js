'use strict';

app.controller('SignUpCtrl', function($scope, $state) {
    //Didsplay back button
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });

    $scope.signUp = function(user) {
        console.log('Sign-In', user);
        $state.go('tabs.home');
    };

})
