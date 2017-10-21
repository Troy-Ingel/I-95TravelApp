angular
	.module('mainApp')
	.controller('HomeController', HomeController);

HomeController.$inject = ['TravelSmartFactory', 'GoogleMapsFactory', 'GeoLocationFactory'];

function HomeController(TravelSmartFactory, GoogleMapsFactory, GeoLocationFactory){
	var vm = this;
	vm.events = [];

	//activate();

	//////////////

	vm.getDirections = function(){
		GoogleMapsFactory.getTransitDirections(vm.currentLocation, vm.destination).then(function(res){
			vm.directions = res.routes[0].legs[0].steps;
		});
	}

	vm.getLocation = function(){
		GeoLocationFactory.getLocation(function(position){
			GoogleMapsFactory.reverseGeocode(position.coords.latitude, position.coords.longitude).then(function(res){
				if(res.results.length > 0)vm.currentLocation = res.results[0].formatted_address;
			})
		})
	}

	function activate(){
		TravelSmartFactory.getEvents().then(function(res){
			vm.events = res;
		});
		TravelSmartFactory.getAlerts().then(function(res){
			vm.alerts = res;
		});
	}
}