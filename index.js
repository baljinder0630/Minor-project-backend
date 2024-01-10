import express from "express"
import dotenv from 'dotenv'
import api from "./routes/api.routes.js"
import db from "./config/db.js"
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import registerSocket from "./controller/socket/registerSocket.js"
import assignTask from "./controller/socket/assignTask.js"
import updateLocation from "./controller/socket/updateLocation.js"

dotenv.config()
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

app.use(express.json())
app.use(cors())


io.on('connection', (socket) => {

    console.log('New Socket connection');
    const userId = socket.handshake.auth.userId;
    const role = socket.handshake.auth.role;
    console.log(userId, role);
    if (!userId || !role) {
        socket.disconnect();
        console.log("Invalid user")
        return;
    }
    else
        registerSocket(userId, role, socket); // saving the socket id in the database

    socket.on('updateLocation', async (data) => {
        updateLocation(data, socket);
    })
    socket.on('assignTaskToPatient', async (data) => {
        assignTask(data, socket);
    })





});


app.use('/api', api)
app.get('/', (req, res) => {
    res.send('Socket.io server is running.');
});
app.get('/health', (req, res) => {
    return res.status(200).send("Health OK")
})

const port = process.env.PORT
// server.listen(port, "192.168.101.5", () => {
//     console.log("Listening to the port " + port)
// })
server.listen(port, () => {
    console.log("Listening to the port " + port)
})

export default app


