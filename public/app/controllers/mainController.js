angular
.module('mainApp')
.controller('MainController', MainController);

MainController.$inject = ['TravelSmartFactory', 'GoogleMapsFactory', 'GeoLocationFactory', 'CameraFactory'];

// this controller links the client to the server, and handles a lot of the front facing logic
function MainController(TravelSmartFactory, GoogleMapsFactory, GeoLocationFactory, CameraFactory){
	var vm = this;
	vm.events = [];
	vm.cameras = [];
	vm.panelToShow = 1;

	vm.getDirections = getDirections;
	vm.getLocation = getLocation;
	vm.getRecommendation = getRecommendation;

	// load data to display when the page initially loads (alerts/events)
	activate();

	//////////////

	// this function gets the directions for the alternative transit options
	// based on the users current location and destination
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
	// this function returns the geolocation of the current user
	function getLocation(){
		vm.loading = true;
		GeoLocationFactory.getLocation(function(position){
			GoogleMapsFactory.reverseGeocode(position.coords.latitude, position.coords.longitude).then(function(res){
				if(res.results.length > 0)vm.currentLocation = res.results[0].formatted_address;
				vm.loading = false;
			})
		})
	}
	// this function takes the driving time and transit time, and lets the user know which
	// option is faster
	function getRecommendation(){
		if(vm.directions && vm.drivingDirections){
			var drivingDuration = Number(vm.drivingDirections.duration.value);
			var transitDuration = Number(vm.directions.duration.value);

			var difference = ((Math.abs(drivingDuration - transitDuration)) / 60);

			var hours = Math.floor(difference/60).toFixed(0);
			var minutes = (difference % 60).toFixed(0);

			difference = (hours > 0 ? hours + " hours and " : '') + minutes + " minutes";

			if(drivingDuration < transitDuration){
				return "You should drive to get there " + difference + " faster";
			} else if(transitDuration < drivingDuration){
				return "You should take the train to get there " + difference + " faster";
			} else{
				return "Not sure";
			}
		}
	}
	// function to set up the initial values
	function activate(){

		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		vm.mobile = check;

		TravelSmartFactory.getEvents().then(function(res){
			vm.events = res;
		});
		TravelSmartFactory.getAlerts().then(function(res){
			vm.alerts = res;
		});
		CameraFactory.getCameras().then(function(res){
			vm.cameras = res;

			// Remove duplicates from cameras array (avoid duplicate options in select)
			let unorderedCameraCities = {};
			for(let i = 0;i < res.length; i++) unorderedCameraCities[res[i].cityName] = 1;
			
			// Order the city names
			let orderedCameraCities = {};
			Object.keys(unorderedCameraCities).sort().forEach(function(key) {
				orderedCameraCities[key] = unorderedCameraCities[key];
			});

			vm.cameraCities = orderedCameraCities;
		});
	}
}