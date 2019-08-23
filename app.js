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

let socket_list = {};
let player_list = {};

let updatePack = {};
let serverX = 500;
let serverY = 250;
let serverDx = 3;
let serverDy = 3;

let serverPalletYP1 = 220;
let serverPalletYP2 = 220;

updatePack = { 
  serverX: serverX, 
  serverY: serverY, 
  serverDx: serverDx, 
  serverDy: serverDy,
  serverPalletYP1: serverPalletYP1,
  serverPalletYP2: serverPalletYP2
};

let Player = function (id) {
  let self = {}
  return self;
}

io.on('connection', function (socket) {
  console.log("player " + socket.id + " connected");

  let player = Player(socket.id);
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
    
    serverPalletYP1 = data.clientPalletYP1;
    serverPalletYP2 = data.clientPalletYP2;
    
    updatePack = { 
      serverX: serverX, 
      serverY: serverY, 
      serverDx: serverDx, 
      serverDy: serverDy,
      serverPalletYP1: serverPalletYP1,
      serverPalletYP2: serverPalletYP2
    };
  });

  if(player_list.lentgh = 2){
    setInterval(() => {
      socket.emit('serverUpdate', updatePack);
    }, 1000 / 60);
  } else {
    console.log("waiting for other player");
  }
});



