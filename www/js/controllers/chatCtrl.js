'use strict';

app.controller('ChatsCtrl', function($scope, $state, $stateParams, $rootScope, ChatService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    if ($rootScope.redirectToChatId) {
      setTimeout(function() {
        $state.go('tab.chat-detail', {chatId: $rootScope.redirectToChatId})
        $rootScope.redirectToChatId = null
      }, 0)
    } else {
      if ($rootScope.user) {
        ChatService.getChatsByUid($rootScope.user._id).then(function(data) {
          $rootScope.chats = data
        }, function(error) {})
        ChatService.getUnreadChatsByUid($rootScope.user._id).then(function(data) {
          if (data) {
            $rootScope.chatBadge = data.length
          }
        }, function(err){})
      } else {
        $rootScope.chats = []
      }
    }
  });

  $scope.openChatDetails = function(chat) {
    if (chat.unread_by.indexOf($rootScope.user._id) > -1) {
      $rootScope.chatBadge = $rootScope.chatBadge-1;
    }
    chat.unread_by = []
    $state.go('tab.chat-detail', {chatId: chat._id})
  }

  $scope.remove = function(chat) {
    _.remove($scope.chats, chat)
    ChatService.removeChatByCid(chat._id);
  };
})
