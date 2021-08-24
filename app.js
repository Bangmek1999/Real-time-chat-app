//ส่วนของ server
const express = require("express");
const socketio = require("socket.io");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render("index");
})
const server = app.listen(process.env.listen || 3000, () => {
    console.log('server is running...');
});

//initializesocket for the server
const io = socketio(server);

io.on("connection", socket => {
    console.log("New user connected");
    socket.username = "Anonymous";

    socket.on("change_username", data => {
        socket.username = data.username;
    })

    //hendle the new message event
    socket.on("new_massage", data => {
        console.log("New massage");
        io.sockets.emit("receive_message", { message: data.message, username: socket.username })
    })
    socket.on("typing", data => {
        socket.broadcast.emit('typing', { username: socket.username })
    })
});