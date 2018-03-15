const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public'); // chuyển đường dẫn từ folder server tới folder public
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var io = socketIO(server); 

io.on('connect',(socket)=>{
    console.log("New user connected");
    
    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Wellcome to the chat app',
        createAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'A new user joined',
        createAt: new Date().getTime()
    });

    socket.on('createMsg',(message) => {
        console.log('createMsg', message);

        socket.broadcast.emit('newMessage',{
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });

    });

    socket.on('disconnect',()=>{
        console.log("New user disconnected");
    });
});



app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});