var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use("/static", express.static(__dirname + "/static"));
app.set("views", __dirname + "/views");
app.set("view engine", "jade");

//Sockets
io.sockets.on("connection", function(socket){
	socket.on("user image", function(image){
		io.sockets.emit("addImage", "Image shared", image);
	});
})

app.get("/", function(request, response){
	response.render("home");
})

http.listen(3000, function(){
	console.log("Server listen at port 3000...")
});