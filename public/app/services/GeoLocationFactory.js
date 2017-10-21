angular
	.module('mainApp')
	.factory('GeoLocationFactory', GeoLocationFactory);

GeoLocationFactory.$inject = ['$http'];

function GeoLocationFactory($http){

	var service = {
		getLocation: getLocation
	};

	return service;

	////////////////////

	function getLocation(callback) {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(callback);
	    } else {
	    	return {};
	    }
	}
}