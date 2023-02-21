//NECESARY PACKAGES
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//start Server
server.listen(PORT, () => {
    console.log("Server listening on port " + PORT)
})

let usernameList = [];
let socketList = [];

// provide webside
app.use(express.static(path.join(__dirname, "public")));

io.on('connection', socket => {

    socket.on('join', username => {
        if (!socketList.find(element => element[0] == username)) {
            console.log(username + "joined");
            socketList.push([username, socket.id]);
            usernameList.push(username);

            socket.emit('allusers', usernameList);
            socket.broadcast.emit('userjoined', username);
            socket.emit('logincomplete');
        }
    })
    socket.on('message', msg => {
        let i = socketList.findIndex(element => element[1] == socket.id);
        if (!socketList[i][0]) {
            console.log("msg: " + msg);
            io.emit('messageback', [socketList[i][0], msg]);
            //socket.emit('message', 'COnnection Accepted');
            //socket.broadcast.emit('message', 'Connection')
            //io.emit('message', 'Connected');
        }
    })



    socket.on('disconnect', () => {
        let i = socketList.findIndex(element => element[1] == socket.id);

        if (i != -1) {
            let l = usernameList.findIndex(element => element == socketList[i][0]);
            socket.broadcast.emit('userleft', socketList[i][0]);
            usernameList.splice(l, 1);
            socketList.splice(i, 1);
        }
    })
})