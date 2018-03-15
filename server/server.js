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

    socket.on('disconnect',()=>{
        console.log("New user disconnected");
    });
});



app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});