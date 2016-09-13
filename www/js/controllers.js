angular.module('starter.controllers', [])
	.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

		// With the new view caching in Ionic, Controllers are only called
		// when they are recreated or on app start, instead of every page change.
		// To listen for when this page is active (for example, to refresh data),
		// listen for the $ionicView.enter event:
		//$scope.$on('$ionicView.enter', function(e) {
		//});

		// Form data for the login modal
		$scope.loginData = {};

		// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/login.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeLogin = function() {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.login = function() {
			$scope.modal.show();
		};

		// Perform the login action when the user submits the login form
		$scope.doLogin = function() {
			console.log('Doing login', $scope.loginData);

			// Simulate a login delay. Remove this and replace with your login
			// code if using a login system
			$timeout(function() {
				$scope.closeLogin();
			}, 1000);
		};
	})
	.controller('PlaylistsCtrl', function($scope) {
		$scope.playlists = [{
			title: 'Reggae',
			id: 1
		}, {
			title: 'Chill',
			id: 2
		}, {
			title: 'Dubstep',
			id: 3
		}, {
			title: 'Indie',
			id: 4
		}, {
			title: 'Rap',
			id: 5
		}, {
			title: 'Cowbell',
			id: 6
		}];
	})
	.controller('PlayCtrl', ['$scope', '$interval', function($scope, $interval) {
		$scope.number = 30;
		$scope.getNumber = function(num) {
			return new Array(num);
		};

		var number;
		$scope.numberCurrent = 30;
		loader = $interval(function() {
			if ($scope.numberCurrent > -1) {
				$scope.numberCurrent = $scope.numberCurrent - 1;
			} else {
				$interval.cancel();
			}
		}, 1000);

		var loader;
		$scope.loader = 100;
		loader = $interval(function() {
			if ($scope.loader > -1) {
				$scope.loader = $scope.loader - 1;
			} else {
				$interval.cancel();
			}
		}, 300);


	}])
	.controller('PlaylistCtrl', function($scope, $stateParams) {

		// var room = new MAF.Room('MatiseFissa');
		// (function(event) {
		// 	console.log(event.type, event.payload);
		// }).subscribeTo(room, ['onConnected', 'onDisconnected', 'onCreated', 'onDestroyed', 'onJoined', 'onHasLeft', 'onData', 'onError']);



	})
	.controller('LoginCtrl', ['$scope', '$state', '$q', '$cordovaFacebook', '$rootScope', '$ionicHistory', function($scope, $state, $q, $cordovaFacebook, $rootScope, $ionicHistory) {

		$scope.loginFacebook = function() {

			$cordovaFacebook.login(["public_profile", "email"]).then(function(success) {
				console.log(success);

				//Need to convert expiresIn format from FB to date
				var expiration_date = new Date();
				expiration_date.setSeconds(expiration_date.getSeconds() + success.authResponse.expiresIn);
				expiration_date = expiration_date.toISOString();

				var facebookAuthData = {
					"id": success.authResponse.userID,
					"access_token": success.authResponse.accessToken,
					"expiration_date": expiration_date
				};

				// console.log('userId: ' + profileInfo.id);
				// console.log('name: ' + profileInfo.name);
				// console.log('email: ' + profileInfo.email);
			}, function(fail) {
				// Fail get profile info
				console.log('profile info fail', fail);
			});

		};

	}]);
