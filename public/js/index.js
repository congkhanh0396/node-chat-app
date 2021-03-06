var socket = io();

socket.on('connect',function(){
    console.log('Connected to server');

})

socket.on('disconnect',function() {
    console.log('Disconnected to server');
});

socket.on('newMessage',function(message){
    console.log('newMessage',message);  
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
  
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
  });

jQuery('#message-form').on('submit',function(e){
    e.preventDefault(); 
    socket.emit('createMsg',{
        from: 'User',
        text: jQuery('[name=message]').val()
    },function(){
        jQuery('[name=message]').val('')
    });
});


var locationButton = jQuery('#send-location');
    jQuery('#send-location').on('click',function(){
        if(!navigator.geolocation){
            return alert('Geolocation not supported for ur browser');
        }

        navigator.geolocation.getCurrentPosition(function(position){
            socket.emit('createMsgLocation',{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },function(){
            alert('Uable to fetch location');
        });       
    });    

