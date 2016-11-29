var socket = io();

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

c.width = c.height = 600;

var playersToDraw = [];
var keys = [];

function update() {
	if (keys[87]) {
		socket.emit("requestMove", "up");
	}
	if (keys[83]) {
		socket.emit("requestMove", "down");
	}
	if (keys[68]) {
		socket.emit("requestMove", "right");
	}
	if (keys[65]) {
		socket.emit("requestMove", "left");
	}

	render();
	requestAnimationFrame(update);
}

function render() {
	ctx.clearRect(0, 0, c.width, c.height);
}

document.addEventListener("keydown", function(event) {
	keys[event.keyCode] = true;
});
document.addEventListener("keyup", function(event) {
	keys[event.keyCode] = false;
});

requestAnimationFrame(update);