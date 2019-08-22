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

// var socket_list = {};
// var player_list = {};

// var Player = function (id) {
//   var self = {}
//   return self;
// }

io.on('connection', function (socket) {
  console.log("yay");
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
//   var player = Player(socket.id);
//   player_list[socket.id] = player;

//   // socket.on('updateServer', function () {
//   //   x = serverX;
//   //   y = serverY;
//   // });

//   socket.on('disconnect', function (socket) {
//     console.log(socket.id + " disconnected");
//     delete socket_list[socket.id];
//     delete player_list[socket.id];
//   });
// });

// setInterval(() => {
//   io.sockets.emit("updateClient", {
//     serverX: x, 
//     serverY: y });
//   }, 1000 / 25);