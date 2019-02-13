var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var WIDTH = 600;
var HEIGHT = 500;

//Pacman
var x = 300;
var y = 300;
var s = 50;

var mx = 0;
var my = 0;
//circle
var circleX;
var circleY;
var circleS = 50;
var circleCollision = false;

//score
var score = 0;

function init() {
	circleX = Math.floor(Math.random() * (WIDTH - circleS))
	circleY = Math.floor(Math.random() * (HEIGHT - circleS))

	window.onkeydown = keydownControl;

	return setInterval(draw, 10);
}

function clear() {
	ctx.clearRect(0,0, WIDTH, HEIGHT);
}

function drawPacman() {
	var pacman = new Image();
	pacman.src = "pacman.jpg"
	ctx.drawImage(pacman, x,y, s, s);
}

function drawCircle() {
	var circle = new Image();
	circle.src = "circle.png"
	ctx.drawImage(circle, circleX, circleY, circleS, circleS);
}

function draw() {
	clear();
	drawPacman();
	drawCircle();
		if (x+mx < 0 || x+mx > WIDTH - s ){
		mx = -mx;
	}
	if (y+my < 0 || y+my > HEIGHT - s){
		my = -my;
	}

	x += mx;
	y += my;

	collisionCheck();
	collisionHandle();
}

function collisionCheck() {
	if ( 
		(x+s >= circleX) 
		&& (x <= circleX + circleS)
		&& (y+s >= circleY)
		&& (y <= circleY + circleS)
		) {
		circleCollision = true;
	} else {
		circleCollision = false;
	}
}

function collisionHandle() {
	if (circleCollision) {
		circleX = Math.floor(Math.random() * (WIDTH - circleS))
		circleY = Math.floor(Math.random() * (HEIGHT - circleS))
		score += 1016293292392;
		document.getElementById("score").innerHTML = score;
	}

}

function keydownControl(e) {
	if (e.keyCode == 37) {
		mx = -4;
		my = 0;
	} else if (e.keyCode == 38) {
		mx = 0;
		my = -4;
	} else if (e.keyCode == 39) {
		mx = 4;
		my = 0;
	} else if (e.keyCode == 40) {
		mx = 0;
		my = 4;
	}
}
	
init();














