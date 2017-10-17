angular
	.module('mainApp')
	.controller('HomeController', HomeController);

HomeController.$inject = ["TravelSmartFactory"];

function HomeController(TravelSmartFactory){

	var vm = this;
	vm.events = [];

	activate();

	/////////////////

	function activate(){
		TravelSmartFactory.getEvents().then(function(res){
			console.log(res);
			vm.events = res;
		});
	}
}