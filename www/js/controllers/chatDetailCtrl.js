'use strict';

app.controller('ChatDetailCtrl', function($scope, $rootScope, $stateParams, ChatService, $ionicHistory) {

  $scope.$on('$ionicView.enter', function(e) {
    ChatService.getChatByCid($stateParams.chatId).then(function(chat) {
      $scope.chat = chat
      }, function(err) {})
  })


  function gotoBottom(id){
     let ele = document.getElementById(id)
     ele.scrollTop = ele.scrollHeight;
  }

  $scope.messages = [];
  ChatService.getMessagesByCid($stateParams.chatId).then(function(messages) {
    $scope.messages = $scope.messages.concat(messages)
    setTimeout(function() {
      gotoBottom('chat-detail')
    }, 0)
  }, function(error) {

  })
  $scope.input = {
    message: ''
  }
  $scope.sendMessage = function() {
    let messagePayload = {
      chat: $scope.chat._id,
      content: $scope.input.message,
      from: $rootScope.user._id
    }
    $scope.input = {
      message: ''
    }
    ChatService.createChatMessage(messagePayload).then(function(res) {
      $scope.messages.push(res.message)
      setTimeout(function() {
        gotoBottom('chat-detail')
      }, 0)
    }, function(error) {})
  }
})
