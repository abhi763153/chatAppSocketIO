const express = require('express');
const server = express();

const http = require('http').createServer(server);

const port = process.env.PORT || 3000;

server.use(express.static("public"))



server.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html")
})




http.listen(port, () => {
    console.log(`Listning on port ${port}`);
})

// Socket 

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('Connected....');

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})