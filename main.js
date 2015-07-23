var express = require('express'),
	bodyParser = require('body-parser'),
	socketio = require('socket.io'),
	myApp = express(),
	clientDir = __dirname + '/public/';


var server = myApp.listen(1337);
var io = socketio.listen(server);

myApp.use(express.static('public'));
myApp.use(bodyParser.json()); 
myApp.use(bodyParser.urlencoded({                           
  extended: true
}));

var messages = [];

myApp.get("/", function (req,res) {
	res.sendFile(clientDir + 'index.html');
})

	io.on('connection', function (socket) {
	console.log("User Connected");
	socket.on('disconnected', function() {
		console.log("User disconnected");
	});

	socket.on('chat message', function (data) {
		messages.push(data);
		io.emit('chat message', data);
	});

	socket.emit('chat history', messages);
})