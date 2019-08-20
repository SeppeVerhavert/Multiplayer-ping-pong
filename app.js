//          VARIABLES           //


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = 500;
let y = 220;
let dx = 3;
let dy = 1;
let ballDiameter = 10;
let palletY = 220;
let pallet1X = 60;
let pallet2X = 960;
let palletwidth = 10;
let palletHeigth = 100;
let upPressed = false;
let downPressed = false;
let scoreP1 = document.getElementById("scoreP1");
let scoreP2 = document.getElementById("scoreP2");
counterP1 = 0;
counterP2 = 0;

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
    ctx.rect(pallet1X, palletY, palletwidth, palletHeigth);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawPallet2() {
    ctx.beginPath();
    ctx.rect(pallet2X, palletY, palletwidth, palletHeigth);
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
    dx = randVelX;
    dy = randVelY;
}

//      PLAYER MOVEMENT        //

function keyDownHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

//      DRAW CANVAS       //

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawField();
    drawBall();
    drawPallet1();
    drawPallet2();

    if (x + dx > pallet1X - palletwidth && x + dx < pallet1X) {
        if (y > palletY && y < palletY + palletHeigth) {
            dx = -dx;
            // randomVelocity();
        }
    } else if (x + dx > pallet2X && x + dx < pallet2X + palletwidth) {
        if (y > palletY && y < palletY + palletHeigth) {
            dx = -dx;
            // randomVelocity();
        }
    }

    if (x + dx > canvas.width-ballDiameter) {
        gameOver();
        x = canvas.width/2;
        counterP1 += 1;
        scoreP1.innerHTML = counterP1;
    } else if (x + dx < 0+ballDiameter) {
        gameOver();
        x = canvas.width/2;
        counterP2 += 1;
        scoreP2.innerHTML = counterP2;
    }

    if (y + dy > canvas.height || y + dy < 0) {
        dy = -dy;
    }

    if (downPressed) {
        palletY += 3;
        if (palletY + palletHeigth > canvas.height) {
            palletY = canvas.height - palletHeigth;
        }
    }
    else if (upPressed) {
        palletY -= 3;
        if (palletY < 0) {
            palletY = 0;
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
    clearInterval(drawInterval);
    clearInterval(window.drawInterval);
    window.drawInterval = setInterval(draw, 10);
    startGame();
}


//          CALL FUNCTIONS           //


startGame();
let drawInterval = setInterval(draw, 10);