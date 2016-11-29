'use strict';

app.controller('ChatsCtrl', function($scope, $state, $rootScope, ChatService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  // $scope.$on('$ionicView.enter', function(e) {
  //   console.log('hi')
  // });

  ChatService.getChatsByUid($rootScope.user._id).then(function(data) {
    console.log(data)
    $scope.chats = data
  }, function(error) {

  })

  $scope.openChatDetails = function(chat) {
    chat.unread_by = []
    $state.go('tab.chat-detail', {chatId: chat._id})
  }

  $scope.remove = function(chat) {
    ChatService.remove(chat);
  };
})
