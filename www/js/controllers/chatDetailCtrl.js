'use strict';

app.controller('ChatDetailCtrl', function($scope, $stateParams, ChatService) {
  $scope.chat = ChatService.get($stateParams.chatId);
})
