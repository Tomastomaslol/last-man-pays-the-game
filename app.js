var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = module.exports.app = express();

app.use(express.static('client-assets'));



app.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname + '/index.html'));
});

var server = http.createServer(app);

// Socket.io server listens to our app
var io = require('socket.io').listen(server);


var connectedClients = [];

function addUpdateClient(client){
    clientfound = false;

    for (var i = connectedClients.length - 1; i >= 0; i--) {

      if (connectedClients[i].id === client.id){
          connectedClients[i] = client;
          clientfound = true;
      }
    }

    if (!clientfound) {
      connectedClients.push(client)
    }
}

io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    socket.on('userPosUpdate', function(data) {
        
        addUpdateClient(data);
        console.log("number connections :", connectedClients.length);
        socket.emit('allUserPos', {clientMarker: connectedClients})
    });

    socket.on('sendPubToServer', function(pub) {
        io.sockets.emit('sendPubToClients', pub);
    });

    socket.on('cancelRace', function() {
        io.sockets.emit('cancelRace', {});
    });

    socket.on('disconnect', function () {
      socket.emit('disconnected', {id: socket.id});
    });
});


server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});