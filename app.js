var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
});
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static('public'));

server.listen(3000);
console.log("server started.");

var socket_list = {};
var player_list = {};

var Player = function (id) {
  var self = {
    x: 250,
    y: 250,
    id: id,
    number: "" + Math.floor(10 * Math.random()),
    pressingRight: false,
    pressingLeft: false,
    pressingUp: false,
    pressingDown: false,
    maxSpd: 10,
  }
  self.updatePosition = function () {
    if (self.pressingRight)
      self.x += self.maxSpd;

    if (self.pressingLeft)
      self.x -= self.maxSpd;

    if (self.pressingUp)
      self.x -= self.maxSpd;

    if (self.pressingDown)
      self.x += self.maxSpd;
  }
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

  // console.log('happy because ' + data.reason);

  // socket.on('happy', function(data){
  //   console.log('happy because ' + data.reason);
  // });

  // socket.emit('serverMsg', {
  //   msg:'hello'
  // });
});

setInterval(function () {
  var pack = [];
  for (var i in player_list) {
    var player = player_list[i];
    player.updatePosition();
    pack.push({
      x: player.x,
      y: player.y,
      number: player.number
    });
  }
  for (var i in socket_list) {
    var socket = socket_list[i];
    socket.emit('newPositions', pack);
  }
}, 1000 / 25);