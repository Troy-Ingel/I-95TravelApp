angular
	.module('mainApp')
	.controller('HomeController', HomeController);

HomeController.$inject = ['TravelSmartFactory', 'GoogleMapsFactory', 'GeoLocationFactory', 'CameraFactory'];

function HomeController(TravelSmartFactory, GoogleMapsFactory, GeoLocationFactory, CameraFactory){
	var vm = this;
	vm.events = [];
	vm.cameras = [];

	vm.getDirections = getDirections;
	vm.getLocation = getLocation;
	vm.getRecommendation = getRecommendation;

	activate();

	//////////////

	function getDirections(){
		vm.loading = true;
		GoogleMapsFactory.getTransitDirections(vm.currentLocation, vm.destination).then(function(res){
			vm.directions = res.routes[0].legs[0];
			vm.loading = false;
		});

		GoogleMapsFactory.getDrivingDirections(vm.currentLocation, vm.destination).then(function(res){
			vm.drivingDirections = res.routes[0].legs[0];
			vm.loading = false;
		});
	}
	function getLocation(){
		vm.loading = true;
		GeoLocationFactory.getLocation(function(position){
			GoogleMapsFactory.reverseGeocode(position.coords.latitude, position.coords.longitude).then(function(res){
				if(res.results.length > 0)vm.currentLocation = res.results[0].formatted_address;
				vm.loading = false;
			})
		})
	}
	function getRecommendation(){
		if(vm.directions && vm.drivingDirections){
			var drivingDuration = Number(vm.drivingDirections.duration.value);
			var transitDuration = Number(vm.directions.duration.value);

			var difference = (Math.abs(drivingDuration - transitDuration)) / 60;

			if(drivingDuration < transitDuration){
				return "You should drive to get there " + difference + " min faster";
			} else if(transitDuration < drivingDuration){
				return "You should take the train to get there " + difference + " min faster";
			} else{
				return "Not sure";
			}
		}
	}
	function activate(){
		TravelSmartFactory.getEvents().then(function(res){
			vm.events = res;
		});
		TravelSmartFactory.getAlerts().then(function(res){
			vm.alerts = res;
		});
		CameraFactory.getCameras().then(function(res){
			vm.cameras = res;

			//Remove duplicates from cameras array (avoid duplicate options in select)
			var cameraCities = {};
			for(var i = 0;i < res.length; i++) cameraCities[res[i].cityName] = 1;
			vm.cameraCities = cameraCities;
		});
	}
}