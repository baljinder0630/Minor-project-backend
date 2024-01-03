import express from "express"
import dotenv from 'dotenv'
import api from "./routes/api.routes.js"
import db from "./config/db.js"
import http from 'http'
import { Server } from 'socket.io'



dotenv.config()
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json())
app.use('/api', api)
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.send('Socket.io server is running.');
});

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    // Emit the 'message' event to the connected socket
    socket.emit('message', 'Welcome!');

    // Listen for 'msg' event from the client
    socket.on('msg', (data) => {
        console.log('Message from client:', data);
    });
});


app.get('/health', (req, res) => {
    return res.status(200).send("Health OK")
})

const port = process.env.PORT
server.listen(port, () => {
    console.log("Listening to the port " + port)
})

export default app


