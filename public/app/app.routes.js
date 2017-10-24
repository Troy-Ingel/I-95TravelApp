angular
	.module('mainApp')
	.config(AngularConfiguration);

AngularConfiguration.$inject = ['$routeProvider', '$sceDelegateProvider'];

function AngularConfiguration($routeProvider, $sceDelegateProvider){
	$routeProvider.when('/', {
		templateUrl: 'app/views/home.html',
		controller: 'HomeController',
		controllerAs: 'vm'
	});
	$sceDelegateProvider.resourceUrlWhitelist(['**']);
}
