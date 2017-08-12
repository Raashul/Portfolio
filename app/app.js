(function(){
	angular.module('Portfolio', ['ui.router'])
		.config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/');

			$stateProvider

			.state('main',{
				url: '/',
				templateUrl: 'app/home/home.html',
				controller: 'HomeController'
			})

		})
}());