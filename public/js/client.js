var socket = io();

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

c.width = c.height = 600;

var playersToDraw = [];
var keys = [];

function update() {
	if (keys[87]) {
		socket.emit("requestMove", 1); // Up
	}
	if (keys[68]) {
		socket.emit("requestMove", 2); // Right
	}
	if (keys[83]) {
		socket.emit("requestMove", 3); // Down
	}
	if (keys[65]) {
		socket.emit("requestMove", 4); // Left
	}
}

function render() {
	ctx.clearRect(0, 0, c.width, c.height);

	for (var i = 0; i < playersToDraw.length; i++) {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = playersToDraw[i].color;
		ctx.arc(playersToDraw[i].x, playersToDraw[i].y, 10, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
	requestAnimationFrame(render);
}

document.addEventListener("keydown", function(event) {
	keys[event.keyCode] = true;
});
document.addEventListener("keyup", function(event) {
	keys[event.keyCode] = false;
});

socket.on("updatePlayers", function(data) {
	playersToDraw = data;
});
socket.on("playerDisconnect", function(data) {
	console.log(data);
	for (var i = 0; i < playersToDraw.length; i++) {
		if (playersToDraw[i].id == data) {
			playersToDraw.splice(i, 1);
		}
	}
});

var mainLoop = setInterval(update, 1000/60);
requestAnimationFrame(render);