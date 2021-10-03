const cors = require('cors');
const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server, {cors: true, origins: ['http://localhost:4000']});

app.use(cors());

const PORT = process.env.PORT || 4000;

let users = [];

const rooms = new Map();

io.on('connection', socket => {
    socket.on('create-room', (roomId, roomName, user) => {
        const newUser = {
            user,
            id: socket.id
        };
        rooms.set(roomId, {"id": roomId, "name": roomName, "messages": [], "currentUsers": [newUser]});
        socket.join(roomId);
        console.log(socket.rooms, socket.id);
        console.log(rooms);
        socket.emit("hi");
    })

    socket.on("join-room", (room, userInfo) => {
        socket.join(room, userInfo);
    });

    socket.on("send-message", ({ content, room, sender }) => {
        const payload = {
            content,
            sender
        };
        socket.to(room).emit("new-message", payload);
    });

    // socket.on("disconnect", () => {
    //     users = users.filter(u => u.id != socket.id);
    //     io.emit("new user", users);
    // });
});

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
});

app.get('/', (req, res) => {
    res.send('Welcome to the boAIrd API');
})