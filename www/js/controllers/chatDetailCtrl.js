'use strict';

app.controller('ChatDetailCtrl', function($scope, $rootScope, $stateParams, ChatService, $ionicHistory) {
  $scope.calendar = function(t) {
    return moment(t).calendar()
  }

  $scope.$on('$ionicView.enter', function(e) {
    ChatService.getChatByCid($stateParams.chatId).then(function(chat) {
      $scope.chat = chat
      }, function(err) {})
  })


  function gotoBottom(id){
     var ele = document.getElementById(id)
     ele.scrollTop = ele.scrollHeight
  }

  $scope.gotoBottom = gotoBottom

  $scope.messages = [];
  ChatService.getMessagesByCid($stateParams.chatId).then(function(messages) {
    $scope.messages = $scope.messages.concat(messages)
    setTimeout(function() {
      gotoBottom('chat-message-list')
    }, 0)
  }, function(error) {

  })
  $scope.input = {
    message: ''
  }
  $scope.sendMessage = function() {
    var messagePayload = {
      chat: $scope.chat._id,
      content: $scope.input.message,
      from: $rootScope.user._id
    }
    $scope.input = {
      message: ''
    }
    ChatService.createChatMessage(messagePayload).then(function(res) {
      res.message.from = $rootScope.user
      $scope.messages.push(res.message)
      setTimeout(function() {
        gotoBottom('chat-message-list')
      }, 0)
    }, function(error) {})
  }
})
