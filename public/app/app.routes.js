angular
	.module('mainApp')
	.config(AngularConfiguration);

AngularConfiguration.$inject = ['$routeProvider', '$sceDelegateProvider'];

// this function links angular to the express app, and also defines the routes
function AngularConfiguration($routeProvider, $sceDelegateProvider){
	$routeProvider.when('/', {
		templateUrl: 'app/views/home.html',
		controller: 'HomeController',
		controllerAs: 'vm'
	});
	$sceDelegateProvider.resourceUrlWhitelist(['**']);
}
