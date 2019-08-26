//          VARIABLES           //


let canvas = document.getElementById("ctx");
let ctx = canvas.getContext("2d");

var clientX;
var clientY;
let clientDx;
let clientDy;

let ballDiameter = 10;
let clientPalletYP1;
let clientPalletYP2;
let palletXP1 = 60;
let palletXP2 = 960;
let palletwidth = 12;
let palletHeigth = 100;

let upPressedP1 = false;
let downPressedP1 = false;
let upPressedP2 = false;
let downPressedP2 = false;

let clientCounterP1;
let clientCounterP2;

let savedX = 0;
let savedY = 0;

// let easyButton = document.getElementById("easyButton");
// let mediumButton = document.getElementById("mediumButton");
// let hardButton = document.getElementById("hardButton");
// let easyMode = true;
// let mediumMode = false;
// let hardMode = false;
// let difficulty;

//          EVENTLISTENERS           //


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// easyButton.addEventListener('click', changeDifficulty);
// mediumButton.addEventListener('click', changeDifficulty);
// hardButton.addEventListener('click', changeDifficulty);


//          FUNCTIONS           //

//      DRAW OBJECTS       //

function drawField() {
    ctx.beginPath();
    ctx.rect(0, 0, 510, 500);
    ctx.fillStyle = "#ff0200";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(510, 0, 510, 500);
    ctx.fillStyle = "#002fff";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.rect(clientX, clientY, ballDiameter, ballDiameter);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawPallet1() {
    ctx.beginPath();
    ctx.rect(palletXP1, clientPalletYP1, palletwidth, palletHeigth);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawPallet2() {
    ctx.beginPath();
    ctx.rect(palletXP2, clientPalletYP2, palletwidth, palletHeigth);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

// //      RANDOM STARTING POINT        //

function randomDirection() {
    let random1 = Math.floor(Math.random() * 2);
    let random2 = Math.floor(Math.random() * 2);
    if (random1 >= 0) {
        clientDx = -clientDx;
    }
    if (random2 >= 0) {
        clientDy = -clientDy;
    }
}

//      RANDOM VELOCITY         //

function randomVelocity() {
    let randVelX = Math.floor(Math.random() * (6 - 3) + 3);
    let randVelY = Math.floor(Math.random() * (6 - 3) + 3);
    if (clientDx < 0 && clientDy < 0) {
        clientDx = - randVelX;
        clientDy = - randVelY;
    }
    else if (clientDx < 0 && clientDy > 0) {
        clientDx = - randVelX;
        clientDy = randVelY;
    }
    else if (clientDx > 0 && clientDy < 0) {
        clientDx = randVelX;
        clientDy = - randVelY;
    }
    else if (clientDx > 0 && clientDy > 0) {
        clientDx = randVelX;
        clientDy = randVelY;
    }
}

//      PLAYER MOVEMENT        //

function keyDownHandler(e) {
    //      PLAYER 1      //
    if (e.keyCode == 83) {
        upPressedP1 = true;
    }
    else if (e.keyCode == 88) {
        downPressedP1 = true;
    }
    //      PLAYER 2      //
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressedP2 = true;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressedP2 = true;
    }
}

function keyUpHandler(e) {
    //      PLAYER 1      //
    if (e.keyCode == 83) {
        upPressedP1 = false;
    }
    else if (e.keyCode == 88) {
        downPressedP1 = false;
    }
    //      PLAYER 2      //
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressedP2 = false;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressedP2 = false;
    }
}

//      DRAW CANVAS       //

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawField();
    drawBall();
    drawPallet1();
    drawPallet2();
    collisionDetection();
    pointMade();
    movePlayers();
    updatescore();
    clientX += clientDx;
    clientY += clientDy;
    // console.log(
    //     "clientX = " + clientX,
    //     "clientY = " + clientY,
    //     "clientDx = " + clientDx,
    //     "clientDy = " + clientDy,
    //     "clientPalletYP1 = " + clientPalletYP1,
    //     "clientPalletYP2 = " + clientPalletYP2
    //     );
}

//      COLLISION DETECTION       //

function collisionDetection() {
    if (clientX + clientDx > palletXP1 - palletwidth && clientX + clientDx < palletXP1) {
        if (clientY >= clientPalletYP1 - 5 && clientY <= clientPalletYP1 + palletHeigth) {
            randomVelocity();
            clientDx = -clientDx;
        }
    } else if (clientX + clientDx > palletXP2 && clientX + clientDx < palletXP2 + palletwidth) {
        if (clientY >= clientPalletYP2 - 5 && clientY <= clientPalletYP2 + palletHeigth) {
            randomVelocity();
            clientDx = -clientDx;
        }
    }
    if (clientY + clientDy > canvas.height || clientY + clientDy < 0) {
        clientDy = -clientDy;
    }
}

//      CHECK FOR POINTS       //

function pointMade() {
    if (clientX > canvas.width) {
        clientCounterP1 += 1;
        gameOver();
    } else if (clientX < 0) {
        clientCounterP2 += 1;
        gameOver();
    }
}

//      PLAYER MOVEMENT       //

function movePlayers() {
    if (downPressedP1) {
        clientPalletYP1 += 7;
        if (clientPalletYP1 + palletHeigth > canvas.height) {
            clientPalletYP1 = canvas.height - palletHeigth;
        }
    }
    else if (upPressedP1) {
        clientPalletYP1 -= 7;
        if (clientPalletYP1 < 0) {
            clientPalletYP1 = 0;
        }
    }

    if (downPressedP2) {
        clientPalletYP2 += 7;
        if (clientPalletYP2 + palletHeigth > canvas.height) {
            clientPalletYP2 = canvas.height - palletHeigth;
        }
    }
    else if (upPressedP2) {
        clientPalletYP2 -= 7;
        if (clientPalletYP2 < 0) {
            clientPalletYP2 = 0;
        }
    }
}

//      START       //

function startGame() {
    drawField();
    randomDirection();
}

//      START AGAIN       //

function gameOver() {
    savedX = clientDx;
    savedY = clientDy;
    clientX = canvas.width / 2 - 5;
    clientY = 250;
    clientDx = 0;
    clientDy = 0;
    setTimeout(timer, 3000);
    clearInterval(drawInterval);
    clearInterval(window.drawInterval);
    window.drawInterval = setInterval(draw, 10);
    updatescore();
    startGame();

}

function timer() {
    clientDx = -savedX;
    clientDy = savedY;
    randomVelocity();
}

//      UPDATE SCORE       //

function updatescore() {
    document.getElementById("scoreP1").innerHTML = clientCounterP1;
    document.getElementById("scoreP2").innerHTML = clientCounterP2;
}
// function changeDifficulty() {
//     if (this.id = "easyButton") {
//         easyMode = true;
//         mediumMode = false;
//         hardMode = false;
//     }
//     else if (this.id = "mediumButton") {
//         easyMode = false;
//         mediumMode = true;
//         hardMode = false;
//     }
//     else if (this.id = "hardButton") {
//         easyMode = false;
//         mediumMode = false;
//         hardMode = true;
//     }
// }


//          CALL FUNCTIONS           //


startGame();
window.drawInterval = setInterval(draw, 10);

var socket = io.connect('http://localhost:3000');

socket.on('serverUpdate', function (update) {
    clientX = update.serverX;
    clientY = update.serverY;
    clientDx = update.serverDx;
    clientDy = update.serverDy;
    clientPalletYP1 = update.serverPalletYP1;
    clientPalletYP2 = update.serverPalletYP2;
    clientCounterP1 = update.serverScoreP1;
    clientCounterP2 = update.serverScoreP2;

    socket.emit('clientUpdate', {
        clientX,
        clientY,
        clientDx,
        clientDy,
        clientPalletYP1,
        clientPalletYP2,
        clientCounterP1,
        clientCounterP2,
    })
});

// socket.on('serverUpdate', function (update) {
//     setTimeout(console.log(
//     update.serverX,
//     update.serverY,
//     update.serverDx,
//     update.serverDy,
//     update.serverPalletYP1,
//     update.serverPalletYP2,
//     update.serverScoreP1,
//     update.serverScoreP2,
//     ), 1000)
// });