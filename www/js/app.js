// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
	'ionic',
	'starter.controllers',
	'ngCordova'
])

.run(['$ionicPlatform', '$state', '$rootScope', function($ionicPlatform, $state, $rootScope) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			// StatusBar.styleDefault();
			StatusBar.overlaysWebView(true);
			// StatusBar.style(1); //Light
			StatusBar.style(2); //Black, transulcent
			// StatusBar.style(3); //Black, opaque
		}
	});

	// Enable pusher logging - don't include this in production
	Pusher.logToConsole = true;

	var pusher = new Pusher('e28b6f53404860a0e3bd', {
		cluster: 'eu',
		encrypted: true
	});

	var alreadydone = false;
	var channel = pusher.subscribe('game');
	channel.bind('newSong', function(data) {
		$rootScope.songTitle = data;
		$rootScope.songArtist = data;
		if (!alreadydone) {
			alreadydone = true;
			$state.go('app.play');
		}
	});
}])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'templates/menu.html',
			controller: 'AppCtrl'
		})
		.state('app.nosound', {
			url: '/nosound',
			views: {
				'menuContent': {
					templateUrl: 'templates/nosound.html',
					controller: 'NosoundCtrl'
				}
			}
		})
		.state('app.login', {
			url: '/login',
			views: {
				'menuContent': {
					templateUrl: 'templates/login.html',
					controller: 'LoginCtrl'
				}
			}
		})
		.state('app.play', {
			url: '/play',
			views: {
				'menuContent': {
					templateUrl: 'templates/play.html',
					controller: 'PlayCtrl'
				}
			}
		})
		.state('app.about', {
			url: '/about',
			views: {
				'menuContent': {
					templateUrl: 'templates/about.html'
				}
			}
		})
		.state('app.prekaraoke', {
			url: '/prekaraoke',
			views: {
				'menuContent': {
					templateUrl: 'templates/prekaraoke.html',
					controller: 'PrekaraokeCtrl'
				}
			}
		})
		.state('app.karaoke', {
			url: '/karaoke',
			views: {
				'menuContent': {
					templateUrl: 'templates/karaoke.html',
					controller: 'KaraokeCtrl'
				}
			}
		});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/nosound');
});
