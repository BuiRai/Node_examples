var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var Log = require("log");
var log = new Log("debug");

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response){
	response.redirect("index.html");
});

//sockets
io.on("connection", function(socket){
	socket.on("stream", function(image){
		socket.broadcast.emit("stream", image);
	});
});

http.listen(PORT, function(){
	log.info("Servidor listen at port %s", PORT)
});