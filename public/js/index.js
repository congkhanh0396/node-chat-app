var socket = io();

socket.on('connect',function(){
    console.log('Connected to server');

    // socket.emit('createEmail',{
    //     to: 'Jen@gmail.com',
    //     text: 'Hey , this is Khanh'
    // });

    socket.emit('createMsg',{
        from: 'Khanh',
        text: 'Yup, that works for me.'
    });
});

socket.on('disconnect',function() {
    console.log('Disconnected to server');
});

socket.on('newEmail', function(email){
    console.log('New email',email)
});

socket.on('newMessage',function(message){
    console.log('newMessage',message);
});