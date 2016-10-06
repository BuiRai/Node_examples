//Socket.io
var socket = io();

socket.on("welcome", function(count){
	$(".count").text(count);
});

//Variables
var movesArray = new Array();
var press;
var context;

var createCanvas = function(){
	var canvasDiv = document.getElementById('pizarra');
	canvas = document.createElement('canvas');
	canvas.setAttribute("width", 500);
	canvas.setAttribute("height", 500);
	canvasDiv.appendChild(canvas);
	context = canvas.getContext("2d");

	$("canvas").mousedown(function(e){
		press = true;
		socket.emit("draw", [ e.pageX-this.offsetLeft, e.pageY-this.offsetTop, false ]);
	});

	$("canvas").mousemove(function(e){
		if(press){
			socket.emit("draw", [ e.pageX-this.offsetLeft, e.pageY-this.offsetTop, true ]);
		}
	});

	$("canvas").mouseup(function(e){
		press = false;
	});

	//If the mouse is outside from the canvas
	$("canvas").mouseleave(function(e){
		press = false;
	});
};

socket.on("update", function(moves){
	drawing(moves);
});

var drawing = function(moves){
	movesArray.push(moves);
	context.lineJoin = "round";
	context.lineWidth = 6;
	context.strokeStyle = "green";
	for (var index = 0; index < movesArray.length; index++) {
		context.beginPath();

		if (movesArray[index][2] && index) {
			context.moveTo(movesArray[index-1][0], movesArray[index-1][1])
		}else{
			context.moveTo(movesArray[index][0], movesArray[index][1])
		}
		context.lineTo(movesArray[index][0], movesArray[index][1])
		context.closePath();
		context.stroke();
	};
}