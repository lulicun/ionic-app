// Ionic Starter App
app = angular.module('ionic-app', ['ionic', 'ion-gallery', 'ngCordova'])

app.run(function($ionicPlatform, $rootScope, $cordovaPush, $localStorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  document.addEventListener("deviceready", function(){
    var push = PushNotification.init({
        android: {
            senderID: "12345679"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        },
        windows: {}
    });



    push.on('registration', function(data) {
        // data.registrationId
        console.log(data);
        alert(data.registrationId);
    });

    push.on('notification', function(data) {
      console.log(data);
      // data.message,
      // data.title,
      // data.count,
      // data.sound,
      // data.image,
      // data.additionalData
    });

    push.on('error', function(e) {
      console.log(e.message);
        // e.message
    });
  }, false);

  if ($localStorage.getObject('keys')) {
    $rootScope.keys = $localStorage.getObject('keys');
    $rootScope.user = $localStorage.getObject('user');
    $rootScope.isLoggedIn = true;
  } else {
    $rootScope.isLoggedIn = false;
  }

})

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })
    .state('signup', {
      url: '/sign-up',
      templateUrl: 'templates/sign-up.html',
      controller: 'SignUpCtrl'
    })
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html',
      controller: 'ForgotPasswordCtrl'
    })
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tab.moment', {
      url: '/moment',
      views: {
        'tab-moment': {
          templateUrl: 'templates/tab-moment.html',
          controller: 'MomentCtrl'
        }
      }
    })
    .state('tab.moment-create', {
      url: '/moment/create',
      views: {
        'tab-moment': {
          templateUrl: 'templates/moment-create.html',
          controller: 'MomentCreateCtrl'
        }
      }
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/moment');

  moment.locale('zh-cn');

});
