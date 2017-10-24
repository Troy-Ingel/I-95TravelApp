angular
	.module('mainApp')
	.factory('CameraFactory', CameraFactory);

CameraFactory.$inject = ['$http'];

function CameraFactory($http){

	var service = {
		getCameras: getCameras
	};
	return service;


	function getCameras(){
		return $http.get('/cameras/roadCameras')
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
}