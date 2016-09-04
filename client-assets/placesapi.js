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

var startbutton = document.querySelector('button#start'),
	cancelbutton =document.querySelector('button#cancel'),
	raceInfo = document.querySelector('.raceinfo');

startbutton.addEventListener('click', initPlacesService);

cancelbutton.addEventListener('click', initCancelRace);

function resetUi(){
	startbutton.removeAttribute('hidden');
	cancelbutton.setAttribute('hidden', 'hidden');
	raceInfo.innerHTML = '';
}


function raceStart(pub) {
	//lol fix
	var pub = pub.pub;
	startbutton.setAttribute('hidden', 'hidden');
	cancelbutton.removeAttribute('hidden');
	raceInfo.innerHTML = 'Get to ' +  pub.name  + ', ' + pub.vicinity + '!';

}