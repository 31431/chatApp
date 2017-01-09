const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const {generateMessage,generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/user.js');

const app = new express();
var server = http.createServer(app);
const port = process.env.PORT || 3000;
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection',function (socket){
	console.log('new user connected at ',new Date());


	socket.on('join',(params,callback)=>{
		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback('Name and room name are required');
		} 
		console.log(params);
		socket.join(params.room);
		users.removeUser(params.id);
		users.addUser(socket.id,params.name,params.room);

		io.to(params.room).emit('updateUserList',users.getUserList(params.room));
		socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));
	})


	socket.on('createMessage',(message,callback)=>{
		var user = users.getUser(socket.id);
		if(user && isRealString(message.text)){
			io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
		}
		callback('This is from the server');
	})

	socket.on('createLocationMessage',(coords)=>{
		var user = users.getUser(socket.id);
		if(user){
			io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));			
		}
	})


	socket.on('disconnect', function (){
		console.log('Disconnected at ',new Date());
		var user = users.removeUser(socket.id);
		if(user){
			io.to(user.room).emit('updateUserList',users.getUserList(user.room));
			io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));

		}
	})
});



server.listen(port,()=>{
	console.log('Connected succesfully on Port', port);
})