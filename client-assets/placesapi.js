function initPlacesService() {
	var service = new google.maps.places.PlacesService(map);

	var pos = bounds.getCenter(); 
	var pubSearch = new google.maps.LatLng(pos.lat(), pos.lng());

 	var request = {
    	location: pubSearch,
    	radius: '500',
    	types: ['bar']
  	};

  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        sendPubToServer(results[i]);
       	return false;
      }
    }
  });
 }
var startbutton = document.querySelector('button');
startbutton.addEventListener('click', initPlacesService);