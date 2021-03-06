/*Express initializes app to be a function handler that you 
can supply to an HTTP server (as seen in line 2).*/
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/*We define a route handler / that gets called when we hit 
our website home.*/
app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

/*Notice that I initialize a new instance of socket.io by 
passing the http (the HTTP server) object. Then I listen 
on the connection event for incoming sockets, and I log 
it to the console.*/
io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('message', msg);
  });

  socket.on("disconnect", function(){
		console.log("User disconnected")
	});
});

//We make the http server listen on port 3000.
http.listen(3000, function(){
  console.log('listening on *:3000');
});