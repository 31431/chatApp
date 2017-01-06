const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const {generateMessage,generateLocationMessage} = require('./utils/message.js');


const app = new express();
var server = http.createServer(app);
const port = process.env.PORT || 3000;
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',function (socket){
	console.log('new user connected at ',new Date());

	socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

	socket.broadcast.emit('newMessage',generateMessage('Admin','A new user has joined'));

	socket.on('createMessage',(message,callback)=>{
		console.log('create message: ',message);
		io.emit('newMessage',generateMessage(message.from,message.text));
		callback('This is from the server');
	})

	socket.on('createLocationMessage',(coords)=>{
		console.log(coords);
		io.emit('newLocationMessage',generateLocationMessage('GoogleMap',coords.latitude,coords.longitude));
	})


	socket.on('disconnect', function (){
		console.log('Disconnected at ',new Date());
	})
});



server.listen(port,()=>{
	console.log('Connected succesfully on Port', port);
})