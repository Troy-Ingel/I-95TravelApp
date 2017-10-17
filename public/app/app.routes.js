angular
	.module('mainApp')
	.config(AngularConfiguration);

AngularConfiguration.$inject = ['$routeProvider'];

function AngularConfiguration($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'app/views/home.html',
		controller: 'HomeController',
		controllerAs: 'vm'
	});
}