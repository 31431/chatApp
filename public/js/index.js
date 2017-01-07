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
	var formattedTime = moment(newMessage.createdAt).format('h:mm a');
	var li = jQuery('<li></li>');
	li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
	jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(newMessage){
	console.log(newMessage);
	var formattedTime = moment(newMessage.createdAt).format('h:mm a');
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My Current Location</a>');
	li.text(`${newMessage.from} ${formattedTime}: `);
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
		jQuery('[name=message]').val('');
	})
})

var locationButton = jQuery('#send-location');
locationButton.on('click',function(event){
	if(!navigator.geolocation){
		return alert('Geolocation not supported');
	}

	locationButton.attr('disabled','disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function(position){
		locationButton.removeAttr('disabled').text('Send Location');
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude : position.coords.longitude
		});
	},function(){
		locationButton.removeAttr('disabled');
		alert('Unable to fetch location');
	})
})
