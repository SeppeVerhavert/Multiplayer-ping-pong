var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
});

//LINK TO JS
app.use('/public', express.static(__dirname + '/public'));

//LINK TO CSS
app.use(express.static('public'));

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
  socket.id = Math.random();
  socket_list[socket.id] = socket;

  var player = Player(socket.id);
  player_list[socket.id] = player;

  socket.on('disconnect', function () {
    delete socket_list[socket.id];
    delete player_list[socket.id];
  });
});