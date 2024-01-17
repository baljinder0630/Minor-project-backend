import patientModel from "../../models/patient.model.js";
import Task from "../../models/task.model.js";
import { patients } from "../../serverMap.js";

const assignTask = async (data, socket) => {
    try {

        const patientId = data.to;
        const careTakerId = data.from;
        const patientSocketId = patients.get(patientId);

        if (patientSocketId && socket.to(patientSocketId).emit('tasksFromCareTaker', data)) {
            console.log('task send from ' + careTakerId + ' to ' + patientId);
        }
        else {
            console.log("Patient offline")
            const patient = await patientModel.findOne({ _id: patientId });
            if (!patient) {
                console.log('No patient found with id ' + patientId);
                return;
            }
            const task = new Task({
                id: data.task.id,
                title: data.task.title,
                note: data.task.note,
                category: data.task.category,
                time: data.task.time,
                date: data.task.date,
                assignedBy: data.task.assignedBy,
                isCompleted: data.task.isCompleted,
                from: data.from,
                to: data.to,
            })
            await task.save();
            console.log("Saving task in mongo");
        }
    } catch (error) {
        console.log(error);
    }
}
export default assignTask;