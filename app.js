//          VARIABLES           //


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = 500;
let y = 250;
let dx = 3;
let dy = 3;
let ballDiameter = 10;
let palletYP1 = 220;
let palletYP2 = 220;
let palletXP1 = 60;
let palletXP2 = 960;
let palletwidth = 10;
let palletHeigth = 100;
let upPressedP1 = false;
let downPressedP1 = false;
let upPressedP2 = false;
let downPressedP2 = false;
let scoreP1 = document.getElementById("scoreP1");
let scoreP2 = document.getElementById("scoreP2");
let counterP1 = 0;
let counterP2 = 0;
let savedX = 0;
let savedY = 0;



//          EVENTLISTENERS           //


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


//          FUNCTIONS           //

//      DRAW OBJECTS       //

function drawField() {
    ctx.beginPath();
    ctx.rect(0, 0, 510, 500);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(510, 0, 510, 500);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.rect(x, y, ballDiameter, ballDiameter);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawPallet1() {
    ctx.beginPath();
    ctx.rect(palletXP1, palletYP1, palletwidth, palletHeigth);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawPallet2() {
    ctx.beginPath();
    ctx.rect(palletXP2, palletYP2, palletwidth, palletHeigth);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

//      RANDOM STARTING POINT        //

function randomDirection() {
    let random1 = Math.floor(Math.random() * 2);
    let random2 = Math.floor(Math.random() * 2);
    if (random1 > 0) {
        dx = -dx;
    }
    if (random2 > 0) {
        dy = -dy;
    }
}

//      RANDOM VELOCITY         //

function randomVelocity() {
    let randVelX = Math.floor(Math.random() * (6 - 3) + 3);
    let randVelY = Math.floor(Math.random() * (6 - 3) + 3);
    if (dx < 0 && dy < 0) {
        dx = - randVelX;
        dy = - randVelY;
    }
    else if (dx < 0 && dy > 0) {
        dx = - randVelX;
        dy = randVelY;
    }
    else if (dx > 0 && dy < 0) {
        dx = randVelX;
        dy = - randVelY;
    }
    else if (dx > 0 && dy > 0) {
        dx = randVelX;
        dy = randVelY;
    } else {

    }
}

//      PLAYER MOVEMENT        //

function keyDownHandler(e) {
    if (e.keyCode == 83 ) {
        upPressedP1 = true;
    }
    else if (e.keyCode == 88 ) {
        downPressedP1 = true;
    }
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressedP2 = true;
    } 
    else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressedP2 = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 83 ) {
        upPressedP1 = false;
    }
    else if (e.keyCode == 88 ) {
        downPressedP1 = false;
    }
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

    if (x + dx > palletXP1 - palletwidth && x + dx < palletXP1) {
        if (y > palletYP1 - 5 && y < palletYP1 + palletHeigth) {
            randomVelocity();
            dx = -dx;
        }
    } else if (x + dx > palletXP2 && x + dx < palletXP2 + palletwidth) {
        if (y > palletYP2 - 5 && y < palletYP2 + palletHeigth) {
            randomVelocity();
            dx = -dx;
        }
    }

    if (x + dx > canvas.width - ballDiameter) {
        counterP1 += 1;
        scoreP1.innerHTML = counterP1;
        gameOver();
    } else if (x + dx < 0 + ballDiameter) {
        counterP2 += 1;
        scoreP2.innerHTML = counterP2;
        gameOver();
    }

    if (y + dy > canvas.height || y + dy < 0) {
        dy = -dy;
    }

    if (downPressedP1) {
        palletYP1 += 7;
        if (palletYP1 + palletHeigth > canvas.height) {
            palletYP1 = canvas.height - palletHeigth;
        }
    }
    else if (upPressedP1) {
        palletYP1 -= 7;
        if (palletYP1 < 0) {
            palletYP1 = 0;
        }
    }

    if (downPressedP2) {
        palletYP2 += 7;
        if (palletYP2 + palletHeigth > canvas.height) {
            palletYP2 = canvas.height - palletHeigth;
        }
    }
    else if (upPressedP2) {
        palletYP2 -= 7;
        if (palletYP2 < 0) {
            palletYP2 = 0;
        }
    }

    x += dx;
    y += dy;
}

//      START       //

function startGame() {
    drawField();
    randomDirection();
}

//      START AGAIN       //

function gameOver() {
    savedX = dx;
    savedY = dy;
    setTimeout(timer, 500);
    clearInterval(drawInterval);
    clearInterval(window.drawInterval);
    window.drawInterval = setInterval(draw, 10);
    dx = 0;
    dy = 0;
    x = canvas.width / 2 - 5;
    y= 250;
    startGame();
}

function timer() {
    dx = -savedX;
    dy = savedY;
    // randomDirection();
    randomVelocity();
}


//          CALL FUNCTIONS           //


startGame();
let drawInterval = setInterval(draw, 10);