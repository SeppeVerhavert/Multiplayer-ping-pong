var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// ctx.fillStyle = "#FFF";
// ctx.fillRect(0, 0, 10, 10); 

// ctx.fillRect(0, 0, 10, 50); 

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "white";
ctx.fill();
ctx.closePath();



ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "white";
ctx.stroke();
ctx.closePath();

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;
}

setInterval(draw, 10);