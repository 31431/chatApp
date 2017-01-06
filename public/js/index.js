var socket = io();

socket.on('connect',function(){
	console.log('Connected to server');

	socket.emit('newUser',{
		newUser: 'Krittin'
	})

});

socket.on('disconnect',function(){
	console.log('Disconnected from server');
});

socket.on('newMessage',function(newMessage){
	console.log('newMessage', newMessage)
	var li = jQuery('<li></li>');
	li.text(`${newMessage.from}: ${newMessage.text}`);
	jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(newMessage){
	console.log(newMessage);
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My Current Location</a>');
	li.text(`${newMessage.from}:`);
	a.attr('href',newMessage.url);
	li.append(a);
	jQuery('#messages').append(li);
})

socket.emit('createMessage',{
	from: 'Krittin',
	text: 'From index.js'
},function(messageFromServer){
	console.log('Got it with:', messageFromServer);
})

jQuery('#message-form').on('submit',function(event){
	event.preventDefault();

	socket.emit('createMessage',{
		from: 'User',
		text: jQuery('[name=message]').val()
	},function(){

	})
})

var locationButton = jQuery('#send-location');
locationButton.on('click',function(event){
	if(!navigator.geolocation){
		return alert('Geolocation not supported');
	}

	navigator.geolocation.getCurrentPosition(function(position){
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude : position.coords.longitude
		})
	},function(){
		alert('Unable to fetch location');
	})
})
