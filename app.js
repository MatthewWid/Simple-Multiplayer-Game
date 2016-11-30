var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var port = 8080;
http.listen(port);

app.use(express.static(__dirname + "/public"));

var players = [];

io.on("connection", function(socket) {
	var player = {
		x: 300,
		y: 300,
		color: "#"+((1<<24)*Math.random()|0).toString(16)
	};
	players.push(player);

	socket.on("requestMove", function(data) {
		if (data == 1) { // Up
			player.y += 1;
		} else if (data == 2) { // Right
			player.x += 1;
		} else if (data == 3) { // Down
			player.y -= 1;
		} else if (data == 4) { // Left
			player.x -= 1;
		}
	});
});

function update() {
	io.emit("updatePlayers", players)
}

var mainLoop = setInterval(update, 1000/60);

console.log("Listening on port: " + port);