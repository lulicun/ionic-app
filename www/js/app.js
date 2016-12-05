// Ionic Starter App
app = angular.module('ionic-app', ['ionic', 'ion-gallery', 'ngCordova'])

app.run(function($ionicPlatform, $rootScope, $cordovaPush, $localStorage, DeviceService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    ionic.Platform.fullScreen();
  });

  document.addEventListener("deviceready", function(){

    // Reference: https://github.com/phonegap/phonegap-plugin-push
    var push = PushNotification.init({
        android: {
            senderID: "liangshanquan"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true",
            clearBadge: "true"
        },
        windows: {}
    });

    push.on('registration', function(data) {
        DeviceService.create({
          device_id: data.registrationId,
          type: 'ios' // TODO: Fix hard code
        }).then(function(result) {
          $rootScope.device_id = data.registrationId;
        }, function(err) {
          if (err.code == 409) {
            $rootScope.device_id = data.registrationId;
          } else {
            alert('System Err: Failed to save your device ID.');
          }
        });
    });

    push.on('notification', function(data) {
      // push.getApplicationIconBadgeNumber(function(n) {
      //   alert('current' + n)
      //     push.setApplicationIconBadgeNumber(function() {}, function() {}, ++n);
      // }, function() {});
      // data.message,
      // data.title,
      // data.count,
      // data.sound,
      // data.image,
      // data.additionalData
    });

    push.on('error', function(e) {
      alert('System Err: ' + e.message);
    });

    $rootScope.pushNotification = push;
  }, false);

  document.addEventListener("resume", function() {
      if ($rootScope.pushNotification) {
        $rootScope.pushNotification.setApplicationIconBadgeNumber(function() {}, function() {}, 0);
      }
      $rootScope.$broadcast('onResume');
  }, false);

  if ($localStorage.getObject('keys')) {
    $rootScope.keys = $localStorage.getObject('keys');
    $rootScope.user = $localStorage.getObject('user');
    $rootScope.isLoggedIn = true;
  } else {
    $rootScope.isLoggedIn = false;
  }

})

app.config(function($stateProvider, $urlRouterProvider, ionGalleryConfigProvider) {

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
      params : {
        updated : false
      },
      views: {
        'tab-moment': {
          templateUrl: 'templates/tab-moment.html',
          controller: 'MomentCtrl'
        }
      }
    })
    .state('tab.moment-detail', {
      url: '/moment/detail/{pid}',
      views: {
        'tab-moment': {
          templateUrl: 'templates/moment-detail.html',
          controller: 'MomentDetailCtrl'
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
    .state('tab.moment-userMoment', {
      url: '/users/{uid}/moment/:title',
      views: {
        'tab-moment': {
          templateUrl: 'templates/user-moment.html',
          controller: 'UserMomentCtrl'
        }
      }
    })
    .state('tab.moment-comment', {
      url: '/moment/comment',
      views: {
        'tab-moment': {
          templateUrl: 'templates/new-comment.html',
          controller: 'NewCommentCtrl'
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

  ionGalleryConfigProvider.setGalleryConfig({
    action_label: '关闭',
    template_gallery: 'gallery.html',
    template_slider: 'slider.html',
    toggle: false,
    row_size: 3,
    fixed_row_size: true
  });

});
