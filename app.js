var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

http.listen(8080);

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
		if (data == "up") {
			player.y += 1;
		} else if (data == "down") {
			player.y -= 1;
		} else if (data == "left") {
			player.x -= 1;
		} else if (data == "right") {
			player.x += 1;
		}
	});
});

console.log("Listening...");