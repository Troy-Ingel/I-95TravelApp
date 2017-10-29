angular
	.module('mainApp')
	.factory('CameraFactory', CameraFactory);

CameraFactory.$inject = ['$http'];

// set up the services needed for this factory
function CameraFactory($http){

	var service = {
		getCameras: getCameras
	};
	return service;


	function getCameras(){
		return $http.get('/cameras')
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
}