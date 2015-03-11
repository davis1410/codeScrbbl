// Front End Web Development Tester App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'code_scrbbl' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'code_scrbbl.services' is found in services.js
// 'code_scrbbl.controllers' is found in controllers.js
angular.module('code_scrbbl', ['ionic', 'code_scrbbl.controllers', 'code_scrbbl.services', 'ngTouch'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    // Home
    .state('tab.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/tab-home.html',
                controller: 'HomeCtrl'
            }
        }
    })

    // HTML
    .state('tab.html', {
      url: '/html',
      views: {
        'tab-html': {
          templateUrl: 'templates/tab-html.html',
          controller: 'HTMLCtrl'
        }
      }
    })

    // CSS
    .state('tab.css', {
      url: '/css',
      views: {
        'tab-css': {
          templateUrl: 'templates/tab-css.html',
          controller: 'CSSCtrl'
        }
      }
    })

    // JavaScript
    .state('tab.js', {
      url: '/js',
      views: {
        'tab-js': {
          templateUrl: 'templates/tab-js.html',
          controller: 'JSCtrl'
        }
      }
    })

    // Preview
    .state('tab.preview', {
      url: '/preview',
      views: {
        'tab-preview': {
          templateUrl: 'templates/tab-preview.html',
          controller: 'PreviewCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
