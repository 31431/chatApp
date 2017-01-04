const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const app = new express();
var server = http.createServer(app);
const port = process.env.PORT || 3000;
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',function (socket){
	console.log('new user connected at ',new Date());

	socket.emit('newMessage',{
		from: 'Krittin',
		text: 'Hi from server',
		createdAt : new Date()
	});

	socket.on('createMessage',(message)=>{
		console.log('create message: ',message);
		io.emit('newMessage',{
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
	})

	socket.on('disconnect', function (){
		console.log('Disconnected at ',new Date());
	})
});



server.listen(port,()=>{
	console.log('Connected succesfully on Port', port);
})