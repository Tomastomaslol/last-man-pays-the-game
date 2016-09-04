var socket = io(),
   data;
var socket = io.connect('/');
socket.heartbeatTimeout = 10000; 

socket.on('welcome', function(data) {
    data = data;
    // Respond with a message including this clients' id sent from the server
    socket.emit('i am client', {data: 'foo!', id: data.id});
});
socket.on('allUserPos', function(data) {
	resetMarkers();
	console.log(data.clientMarker.length);
	for (var i = data.clientMarker.length - 1; i >= 0; i--) {
		createMarker(data.clientMarker[i].lat, data.clientMarker[i].lng, data.clientMarker[i].id, data.clientMarker[i].markercolor);
	}
});

socket.on('cancelRace', function(data) {
	cancelRace();
});

socket.on('sendPubToClients', function(data) {
	createPubMarker(data);
});
function sendPubToServer(pub){
	if (socket.connected) {
		socket.emit('sendPubToServer', { pub: pub })
	}
}

function initCancelRace(){
	socket.emit('cancelRace', {});
}

socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

socket.on('disconnect', function (data) {
	console.warn("disconnected :", data);

});


function pushMarkerToserver(pos) {
	if (socket.connected) {
		socket.emit('userPosUpdate', 
			{ 
				lat: pos.coords.latitude, 
				lng: pos.coords.longitude,  
				id: socket.id, 
			});
	}
}