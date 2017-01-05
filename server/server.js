const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const {generateMessage} = require('./utils/message.js');

const app = new express();
var server = http.createServer(app);
const port = process.env.PORT || 3000;
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',function (socket){
	console.log('new user connected at ',new Date());

	socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

	socket.broadcast.emit('newMessage',generateMessage('Admin','A new user has joined'));

	socket.on('createMessage',(message)=>{
		console.log('create message: ',message);
		io.emit('newMessage',generateMessage(message.from,message.text))
		

		// io.emit('newMessage',{
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })

		// socket.broadcast.emit('newMessage',{
		// 	from: message.from,
		// 	text: message.text,
		//  	createdAt: new Date().getTime()
		// })
	})


	socket.on('disconnect', function (){
		console.log('Disconnected at ',new Date());
	})
});



server.listen(port,()=>{
	console.log('Connected succesfully on Port', port);
})