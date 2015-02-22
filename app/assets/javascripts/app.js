myApp=angular.module('myApp',['ngRoute','Devise']);

myApp.config(['$routeProvider',function ($routeProvider) {

	$routeProvider.when('/',{
		templateUrl: 'assets/templates/Profile.html',
		controller: 'profileCtrl'
	});
	$routeProvider.when('/signin',{
		templateUrl: 'assets/templates/SignIn.html',
		controller: 'logInCtrl'
	});
	$routeProvider.when('/signup',{
		templateUrl: 'assets/templates/SignUp.html',
		controller: 'registerCtrl'
	});
}]);

myApp.controller('navCtrl',['$scope','Auth',function ($scope,Auth) {

	$scope.signIn = Auth.isAuthenticated;
	$scope.logOut = Auth.logout;

	Auth.currentUser().then(function (user) {
		$scope.user=user;
	});

	$scope.$on('devise:new-registration',function (e,user) {
		$scope.user=user;
	});

	$scope.$on('devise:login',function (e,user) {
		$scope.user=user;
	});

	$scope.$on('devise:logout',function (e,user) {
		$scope.user={};
	});

}]);

myApp.controller('registerCtrl',['$scope','$location','Auth',function ($scope,$location,Auth) {
	$scope.user={
		email: '',
		username: '',
		password: '',
		password_confirmation: ''
	};

	$scope.register=function () {
		Auth.register($scope.user).then(function () {
			$location.path('/');
		});
	};
}]);

myApp.controller('logInCtrl',['$scope','$location','Auth',function ($scope,$location,Auth) {
	$scope.user={
		email: '',
		password: ''
	};

	$scope.login=function () {
		Auth.login($scope.user).then(function () {
			$location.path('/');
		},function (error) {
			$scope.error="this is error";
		});
	}
}]);

myApp.controller('profileCtrl',['$scope','Auth',function ($scope,Auth) {
	
	Auth.currentUser().then(function (user) {
		$scope.user=user;
	},function (error) {
		$scope.error="User Did not Log In yet";
	});
}]);