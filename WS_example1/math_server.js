var sys = require("sys"),
	http = require("http");

var operations = {
	add : function(a, b){
		return a+b;
	},
	sub : function(a, b){
		return a -b;
	},
	mul : function(a, b){
		return a* b;
	},
	div : function(a, b){
		return a/b;
	}
}

http.createServer(function(req, res){
	var parts = req.url.split("/");
	op = operations[parts[1]];
	a = parseInt(parts[2], 10);
	b = parseInt(parts[3], 10);

	var result = op ? op(a, b) : "Error";

	sys.puts(sys.inspect(parts));
	res.writeHead(200, {"Content-Type" : "text/html"});
	res.end("The result is: " + result);
}).listen(3000, "localhost");