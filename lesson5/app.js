console.log("test...");

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var WIDTH = 600;
var HEIGHT = 400;

var x,y;
var mx, my;

//initialize animation
function init() {
	x = 300;
	y = 200;
	mx = 3;
	my = 4;
	return setInterval(draw, 10);
}

function circle(x,y,r){
	ctx.beginPath();
	ctx.arc(x,y,r,0, 6.28);
	ctx.closePath();
	ctx.fillStyle = "red";
	ctx.fill();
}

function clear(){
	ctx.clearRect(0,0, WIDTH, HEIGHT)
}

function draw() {
	clear();
	circle(x,y,30);

	if (x+mx < 0 || x+mx > WIDTH){
		mx = -mx;
	}
	if (y+my < 0 || y+my > HEIGHT){
		my = -my;
	}

	x += mx;
	y += my;
}

init();






