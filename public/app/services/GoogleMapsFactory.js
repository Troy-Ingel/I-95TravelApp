angular
	.module('mainApp')
	.factory('GoogleMapsFactory', GoogleMapsFactory);

GoogleMapsFactory.$inject = ['$http'];

// set up the services needed for this factory
function GoogleMapsFactory($http){

	var service = {
		getTransitDirections: getTransitDirections,
		getDrivingDirections: getDrivingDirections,
		reverseGeocode: reverseGeocode
	};

	return service;

	////////////////////

	function getTransitDirections(origin, destination){
		var url = '/directions/transit?origin=' + origin + '&destination=' + destination;

		return $http.get(url)
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
	function getDrivingDirections(origin, destination){
		var url = '/directions/driving?origin=' + origin + '&destination=' + destination;

		return $http.get(url)
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
	function reverseGeocode(lat, long){
		var url = '/directions/geocode?latlng=' + lat.toString() + ',' + long.toString();

		return $http.get(url)
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
}