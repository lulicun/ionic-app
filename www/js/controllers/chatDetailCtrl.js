'use strict';

app.controller('ChatDetailCtrl', function($scope, $stateParams, ChatService) {
  $scope.messages = [];

  ChatService.getMessagesByCid($stateParams.chatId).then(function(messages) {
    $scope.messages = $scope.messages.concat(messages)
  }, function(error) {

  })
})
