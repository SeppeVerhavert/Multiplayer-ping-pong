var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

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

var ballpack = {};
var serverX = 500;
var serverY = 250;
var serverDx = 3;
var serverDy = 3;
ballpack = { 
  serverX: serverX, 
  serverY: serverY, 
  serverDx: serverDx, 
  serverDy: serverDy 
};

var Player = function (id) {
  var self = {}
  return self;
}

io.on('connection', function (socket) {
  console.log("player " + socket.id + " connected");

  var player = Player(socket.id);
  player_list[socket.id] = player;

  socket.on('disconnect', function () {
    console.log(socket.id + " disconnected");
    delete socket_list[socket.id];
    delete player_list[socket.id];
  });


  socket.on('clientUpdate', function (data) {
    serverX = data.clientX + serverDx;
    serverY = data.clientY + serverDy;
    serverDx = data.clientDx;
    serverDy = data.clientDy;
    ballpack = { 1: serverX, 2: serverY, 3: serverDx, 4: serverDy};
  });

  setInterval(() => {
    socket.emit('serverUpdate', ballpack);
  }, 1000 / 25);
});



