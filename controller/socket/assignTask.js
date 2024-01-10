import patientModel from "../../models/patient.model.js";
import Task from "../../models/task.model.js";

const assignTask = async (data, socket) => {
    try {

        // { 'userId': patientId, 'task': task, 'careTakerId': careTakerId });

        const patientId = data.to;
        if (!patientId) {
            console.log('Patient id not found in assign task');
            return;
        }
        const patient = await patientModel.findOne({ _id: patientId });
        if (!patient) {
            console.log('No patient found with id ' + patientId);
            return;
        }

        console.log(data);
        if (socket.to(patient.socketId).emit('tasksFromCareTaker', data)) {
            console.log('task send from ' + patientId + ' to ' + patient._id);
        }
        else {
            const task = new Task({
                id: data.task.id,
                title: data.task.title,
                note: data.task.note,
                category: data.task.category,
                time: data.task.time,
                date: data.task.date,
                assignedBy: data.task.assignedBy,
                isCompleted: data.task.isCompleted,
                from: data.to,
                to: data.from,
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export default assignTask;