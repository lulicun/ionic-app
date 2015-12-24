'use strict';

app.controller('ChatsCtrl', function($scope, ChatService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = ChatService.all();
  $scope.remove = function(chat) {
    ChatService.remove(chat);
  };
})
