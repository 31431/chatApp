var socket = io();

function scrollToBottom(){
	//Selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');
	//Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	console.log(clientHeight);
	console.log(scrollTop);
	console.log(scrollHeight);
	console.log(newMessageHeight);
	console.log(lastMessageHeight);
	
	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
}

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
	var template = jQuery('#message-template').html();
	var formattedTime = moment(newMessage.createdAt).format('h:mm a');
	var html = Mustache.render(template,{
		from: newMessage.from,
		text: newMessage.text,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();
});

socket.on('newLocationMessage',function(newMessage){
	var template = jQuery('#location-template').html();
	var formattedTime = moment(newMessage.createdAt).format('h:mm a');
	var html = Mustache.render(template,{
		from: newMessage.from,
		url: newMessage.url,
		createdAt: formattedTime	
	})

	jQuery('#messages').append(html);
	scrollToBottom()
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
