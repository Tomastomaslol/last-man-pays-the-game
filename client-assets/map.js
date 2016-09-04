var map, markers = [];
//create empty LatLngBounds object
var bounds;

function resetMarkers(){
  for(i=0; i<markers.length; i++){
      markers[i].setMap(null);
  }

  markers = [];
}

  function createMarker(lat, lng, id) {
  
    var marker = new google.maps.Marker({
      position: {lat: parseFloat(lat), lng: parseFloat(lng)},
      map: map,
      title: id
    });
    bounds.extend(marker.position);
    map.fitBounds(bounds);
    markers.push(marker);
  } 

  function initGetNewPosition() {
      window.setInterval(function(){
        navigator.geolocation.getCurrentPosition(pushMarkerToserver);
      }, 2000);
  }

function createPubMarker(pub) {
  var image = 'http://www.free-icons-download.net/images/beer-keg-icon-49881.png';
  console.log(pub);
  var marker = new google.maps.Marker({
      position: {lat: pub.pub.geometry.location.lat, lng: pub.pub.geometry.location.lng},
      map: map,
      title: "pub",
      icon: image
    });

    bounds.extend(marker.position);
    map.fitBounds(bounds);
}



 function initMap() {
 
  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
        initGetNewPosition();
        bounds = new google.maps.LatLngBounds();
    } else {
      console.log('Geo Location is not supported');
    }   
 }

  function success(pos){
    console.log(pos);
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
        zoom: 15
    });
  }