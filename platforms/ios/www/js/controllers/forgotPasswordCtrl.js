'use strict';

app.controller('ForgotPasswordCtrl', function($scope, $state) {
    //Didsplay back button
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });

    $scope.submit = function(user) {
        console.log('Submit', user);
        $state.go('tabs.home');
    };

})
