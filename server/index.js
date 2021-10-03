const cors = require('cors');
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const reRegExp = require('reregexp').default;
const Room = require('./models/Room.js');

const app = express();
const server = http.createServer(app);
const io = socket(server, {cors: true, origins: ['http://localhost:4000']});

app.use(cors());

const PORT = process.env.PORT || 4000;

let users = [];

const rooms = new Map();

io.on('connection', socket => {
    socket.on('create-room', ({userName, title}) => {
        const newUser = {
            user: userName,
            id: socket.id
        };

        let randomId = getRandomizedId();
        var newRoom = new Room(randomId, title);
        
        // Adds the current user to the room they just created
        newRoom.addUser(newUser);
        rooms.set(newRoom.id, newRoom);
        
        // Sets the current socket for the given user to the new room.
        socket.join(newRoom.id);

        socket.emit("success-create", newRoom);
    })

    socket.on("join-room", ({userName, roomId}) => {
        if(rooms.get(roomId) == null){
            socket.emit("failed-join");
            return;
        }
            
        const newUser = {
            user: userName,
            id: socket.id
        }

        // Gets the existing room data and adds a user to the room.
        rooms.get(roomId).addUser(newUser);
        rooms.set(roomId, rooms.get(roomId)); 

        // Sets the current socket for the given user to the existing room.
        socket.join(roomId);

        socket.emit("success-join", rooms.get(roomId));
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

function getRandomizedId(){
    var regex = new reRegExp(/^[0-9,A-Z,a-z]{15}$/, {
        extractSetAverage: true
    });

    return regex.build().toString();
}
