let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = 500;
let y = 220;
let dx = 3;
let dy = 3;
let ballDiameter = 10;
let palletY= 220;
let pallet1X = 50;
let pallet2X = 940;
let palletwidth = 10;
let palletHeigth = 100;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawField() {
    ctx.beginPath();
    ctx.rect(0, 0, 500, 500);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.rect(500, 0, 500, 500);
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

function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }   
}

function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawField();
    drawBall();
    drawPallet1();
    drawPallet2();

    if (x + dx > pallet1X - palletwidth && x + dx < pallet1X) {
        if (y > palletY && y < palletY + palletHeigth) {
            dx = -dx;
        }
    } else if(x + dx > pallet2X && x + dx < pallet2X + palletwidth) {
        if (y > palletY && y < palletY + palletHeigth) {
            dx = -dx;
        }
    } 
    
    if (x + dx > canvas.width || x + dx < 0) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
    }
    
    if (y + dy > canvas.height || y + dy < 0) {
        dy = -dy;
    } 

    if(downPressed) {
        palletY += 5;
        if (palletY + palletHeigth > canvas.height) {
            palletY = canvas.height - palletHeigth;
        }
    }
    else if(upPressed) {
        palletY -= 5;
        if (palletY < 0) {
            palletY = 0;
        }
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);