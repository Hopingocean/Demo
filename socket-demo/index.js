var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
  pingInterval: 10000,
  pingTimeout: 25000
});

app.get('/', function(req, res) {
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  // socket.broadcast.emit('hi');
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
  socket.on('message', function(msg) {
    console.log(msg);
  });
  socket.on('disconnect', function(msg) {
    console.log('disconnect:' + msg);
  });
  socket.on('error', function(error) {
    console.log('error:' + error);
  });
  socket.on('disconnecting', function(reason) {
    console.log('disconnecting:' + reason);
  });
  // socket.on('reconnect', function(msg) {
  //   console.log('user reconnect' + msg);
  // });
  // socket.on('connect_error', function() {
  //   console.log('user connect_error');
  // });
  // socket.on('connect_timeout', function() {
  //   console.log('user connect_timeout');
  // });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});