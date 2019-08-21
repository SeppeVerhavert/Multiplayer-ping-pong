var express = require('express');
var app = express();
var server = require('http').Server(app);
// var io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/Client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

server.listen(3000);
console.log("server started.");

var socket_list = {};

var io = require('socket.io')(server);
io.sockets.on('connection', function (socket) {
  socket.id = Math.random();
  socket.x = 0;
  socket.y = 0;
  socket_list[socket.id] = socket;

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
  for (var i in socket_list) {
    var socket = socket_list[i];
    socket.x++;
    socket.y++;
    pack.push({
      x: socket.x,
      y: socket.y
    });
  }  
  for(var i in socket_list) {
    var socket = socket_list[i];
    socket.emit('newPositions', pack);
  }
}, 1000 / 25);