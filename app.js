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


//  SET LISTS AND VARIABLES
let socket_list = {};
let player_list = [];
let i = 0;

// let multiPlayer = false;

let updatePack = {};
let serverX = 500;
let serverY = 250;
let serverDx = 3;
let serverDy = 3;

// let serverPalletYP1 = 220;
// let serverPalletYP2 = 220;

// let serverScoreP1 = 0;
// let serverScoreP2 = 0;

//  MAKE SOCKET ON CONNECTION

io.on('connection', function (socket) {
  console.log("player " + socket.id + " connected");
  i++;
  player_list[socket.id] = ['player' + i];

  updateServerPack();
  socket.emit('serverUpdate', updatePack);

  socket.on('clientUpdate', function (data) {
    setTimeout(function () { serverUpdate(data); });
    setTimeout(function () { socket.emit('serverUpdate', updatePack); }, 10);
  });

  socket.on('disconnect', function () {
    console.log(socket.id + " disconnected");
    delete socket_list[socket.id];
    delete player_list[socket.id];
  });
});


function serverUpdate(data) {
  storeClientData(data);
  applyLogic(data);
  updateServerPack(data);
}

function storeClientData(data) {
  serverX = data.clientX;
  serverY = data.clientY;

  serverDx = data.clientDx;
  serverDy = data.clientDy;

  // serverPalletYP1 = data.clientPalletYP1;
  // serverPalletYP2 = data.clientPalletYP2;

  // serverScoreP1 = data.clientCounterP1;
  // serverScoreP2 = data.clientCounterP2;
}


function applyLogic() {
  serverX += serverDx;
  serverY += serverDy;

  if (serverY + serverDy > 490 || serverY + serverDy < 0) {
    serverDy = -serverDy;
  }
  if (serverX + serverDx > 1010 || serverX + serverDx < 0) {
    serverDx = -serverDx;
  }
}

function updateServerPack() {
  updatePack = {
    serverX: serverX,
    serverY: serverY,
    serverDx: serverDx,
    serverDy: serverDy,
    // serverPalletYP1: serverPalletYP1,
    // serverPalletYP2: serverPalletYP2,
    // serverScoreP1: serverScoreP1,
    // serverScoreP2: serverScoreP2,
  }
}