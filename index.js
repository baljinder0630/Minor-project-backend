import express from "express"
import dotenv from 'dotenv'
import api from "./routes/api.routes.js"
import db from "./config/db.js"
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import assignTask from "./controller/socket/assignTask.js"
import updateLocation from "./controller/socket/updateLocation.js"
import { careTakers, patients } from "./serverMap.js"
import Task from "./models/task.model.js"
import { setTimeout } from "timers"

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



io.on('connection', async (socket) => {

    console.log('New Socket connection');
    const userId = socket.handshake.auth.userId;
    const role = socket.handshake.auth.role;
    console.log(userId, role);
    if (!userId || !role) {
        socket.disconnect();
        console.log("Invalid user")
        return;
    }
    else if (role === 'patient') {
        patients.set(userId, socket.id);
        await Task.find({ to: userId }).then((tasks) => {
            // wait for 3 seconds
            setTimeout(() => {
                tasks.forEach(async (task) => {

                    // console.log(task);
                    console.log("Task from mongo to patient " + userId);
                    const data = {
                        to: userId,
                        from: task.from,
                        task: {
                            id: task.id,
                            title: task.title,
                            note: task.note,
                            category: task.category,
                            time: task.time,
                            date: task.date,
                            assignedBy: task.assignedBy,
                            isCompleted: task.isCompleted,
                        }
                    }
                    console.log(socket.id);
                    socket.emit('tasksFromCareTaker', data)
                    //await assignTask(data, socket);

                    // socket.to(socket.id).emit('tasksFromCareTaker', task)
                    // socket.emit('tasksFromCareTaker', task);
                    // delete the task from mongo
                    task.deleteOne();
                })
            }, 3000)



        }).catch((error) => {
            console.log(error);
        })
    }
    else if (role === 'careTaker') {
        careTakers.set(userId, socket.id);
    }
    else {
        socket.disconnect();
        console.log("Invalid role")
        return;
    }


    socket.on('updateLocation', async (data) => {
        updateLocation(data, socket);
    })
    socket.on('assignTaskToPatient', async (data) => {
        assignTask(data, socket);
    })

    socket.on('disconnect', () => {
        console.log(`User with id ${userId} disconnected`);
        if (role === 'patient') {
            patients.delete(userId);
            console.log("Patient disconnected")
        }
        else if (role === 'careTaker') {
            careTakers.delete(userId);
            console.log("CareTaker disconnected")
        }
        else {
            console.log("Invalid role in disconnect")
            return;
        }
    });
});


app.use('/api', api)

app.get('/', (req, res) => {
    return res.status(200).send("Hi, " + process.env.NAME + " is here")
})

app.get('/health', (req, res) => {
    return res.status(200).send("Health OK")
})

const port = process.env.PORT
server.listen(port, () => {
    console.log("Listening to the port " + port)
})

export default app


