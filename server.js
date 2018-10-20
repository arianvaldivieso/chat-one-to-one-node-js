var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  	console.log('a user connected');

  	socket.on('room', (data) => {
  		socket.join(data.room);
  	});

  	socket.on('send-message', function(data) {
  		console.log(data);

  		io.sockets.in(data.room).emit('message', data);
  	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});