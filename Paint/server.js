var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

//Config static files, css, js, img
app.use('/static', express.static(__dirname + '/static'));

//set views
app.set("views", __dirname + "/views");
app.set("view engine", "jade");

//Socket io
var count = 0;
io.on("connection", function(socket){
	count++;
	io.sockets.emit("welcome", count);
	
	//Moves is an araray of coordenates
	socket.on("draw", function(moves){
		console.log("Recibiendo: " + moves);
		io.sockets.emit("update", moves);
	});

});

app.get("/", function(request, response){
	response.render("home", {message: "Bienvenido a la pizarra"});
});

http.listen(3000, function(){
	console.log("Server started at port 3000");
});