var express = require('express');
var app = express();
var server = require('http').Server(app);

//  GET HTML
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
});

//  LINK TO JS
app.use('/public', express.static(__dirname + '/public'));

//  LINK TO CSS
app.use(express.static('public'));

//  SET PORT
server.listen(3000);
console.log("server started.");

var socket_list = {};
var player_list = {};

var Player = function (id) {
  var self = {}
  return self;
}

var io = require('socket.io')(server);
io.sockets.on('connection', function (socket) {
  console.log(socket_list);

  console.log(socket.id + " connected");
  var player = Player(socket.id);
  player_list[socket.id] = player;

  socket.on('disconnect', function () {
    console.log(socket.id + " disconnected");
    delete socket_list[socket.id];
    delete player_list[socket.id];
  });
});

// setInterval(() => {
//   io.sockets.emit("updateClient", updateClient({
//       circleX: playerState.circleX,
//       circleY: playerState.circleY
//   })
// , 1000 / 25)});