angular
	.module('mainApp')
	.factory('TravelSmartFactory', TravelSmartFactory);

TravelSmartFactory.$inject = ['$http'];

// set up the services needed for this factory
function TravelSmartFactory($http){

	var service = {
		getAlerts: getAlerts,
		getEvents: getEvents
	};

	return service;

	////////////////////

	function getAlerts(){
		return $http.get('/travel/alerts')
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
	function getEvents(){
		return $http.get('/travel/events')
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
}