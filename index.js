import express from "express"
import dotenv from 'dotenv'
import api from "./routes/api.routes.js"
import db from "./config/db.js"
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import patientModel from "./models/patient.model.js"
import careTakerModel from "./models/careTaker.model.js"
// import allocateCaretaker from "./service/allocateCaretaker.service.js"

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

    socket.on('registerSocket', async (data) => {
        console.log('Registering socket :- ', data);
        const userId = data.userId;
        const role = data.role;
        console.log(userId, role);

        if (!userId) {
            return;
        }
        if (role == 'patient') {
            const user = await patientModel.findOne({ _id: userId });
            // console.log('User :- ', user);
            if (!user) {
                return;
            }
            user.socketId = socket.id;
            await user.save();
        }
        else if (role == 'careTaker') {
            const user = await careTakerModel.findOne({ _id: userId });
            // console.log('User :- ', user);
            if (!user) {
                return;
            }
            user.socketId = socket.id;
            await user.save();
        }
        else {
            console.log('Invalid role');
            return;
        }
    })

    socket.on('updateLocation', async (data) => {

        console.log('Updating location', data);
        const { userId } = data;  // checking which careTaker is assigned to this patient

        const careTaker = await careTakerModel.findOne({ assignedPatients: { $in: [userId] } });
        // const careTaker = await careTakerModel.findOne({ _id: careTakerId });
        // console.log('CareTaker :- ', careTaker);
        if (!careTaker) {
            return;
        }
        console.log("location send");
        socket.to(careTaker.socketId).emit('updateLocation', data);
    })

    // socket.on('allocateCaretaker', async (data) => { 
    //     if (!data.caretakerId || !data.patientId) {
    //         console.log('Invalid data');
    //         return;
    //     }
    //     await allocateCaretaker(data.caretakerId, data.patientId);
    // })
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


