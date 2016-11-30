'use strict';

app.controller('ChatDetailCtrl', function($scope, $stateParams, ChatService, $ionicHistory) {

  $scope.$on('$ionicView.enter', function(e) {
    ChatService.getChatByCid($stateParams.chatId).then(function(chat) {
      console.log(chat)
      $scope.chat = chat
      }, function(err) {

      })
    })


  $scope.messages = [];
  ChatService.getMessagesByCid($stateParams.chatId).then(function(messages) {
  $scope.messages = $scope.messages.concat(messages)
  }, function(error) {

  })
})
