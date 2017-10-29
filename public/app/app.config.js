angular
	.module('mainApp')
	.config(AngularConfiguration);

AngularConfiguration.$inject = ['$sceDelegateProvider'];

// this function links angular to the express app, and also defines the routes
function AngularConfiguration($sceDelegateProvider){
	$sceDelegateProvider.resourceUrlWhitelist(['**']);
}
