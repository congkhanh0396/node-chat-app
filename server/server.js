const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public'); // chuyển đường dẫn từ folder server tới folder public
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var io = socketIO(server); 

io.on('connect',(socket)=>{
    console.log("New user connected");
    
    socket.emit('newMessage',generateMessage('Admin', 'Wellcome to the app chat'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','A new user joined'));

    // socket.on('createMsg',(message) => generateMessage(message.from, message.text));

    socket.on('createMsg',(message, callback) =>{
        console.log('createMsg',message);
        io.emit('newMessage',generateMessage(message.from, message.text));
        callback('This is from server');
    });

    socket.on('createMsgLocation',(coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect',()=>{
        console.log("New user disconnected");
        socket.broadcast.emit('newMessage',generateMessage('Admin','A user left'));
    });
});



app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});