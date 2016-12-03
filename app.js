var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var port = 8080;
http.listen(port);

app.use(express.static(__dirname + "/public"));

var players = [];
var playerSpeed = 2;

io.on("connection", function(socket) {
	console.log("User connected.");

	var player = {
		x: 300,
		y: 300,
		color: "#"+((1<<24)*Math.random()|0).toString(16),
		id: socket.id
	};
	players.push(player);

	socket.on("requestMove", function(data) {
		if (data == 1) { // Up
			player.y -= playerSpeed;
		} else if (data == 2) { // Right
			player.x += playerSpeed;
		} else if (data == 3) { // Down
			player.y += playerSpeed;
		} else if (data == 4) { // Left
			player.x -= playerSpeed;
		}
	});

	socket.on("disconnect", function() {
		console.log("User disconnected.");
		for (var i = 0; i < players.length; i++) {
			if (players[i].id == socket.id) {
				players.splice(i, 1);
			}
		}
		io.emit("playerDisconnect", socket.id);
	})
});

function update() {
	io.emit("updatePlayers", players)
}

var mainLoop = setInterval(update, 1000/60);

console.log("Listening on port: " + port);