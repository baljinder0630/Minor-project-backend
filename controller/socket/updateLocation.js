import careTakerModel from "../../models/careTaker.model.js";

const updateLocation = async (data, socket) => {

    try {

        const patientId = data.userId;
        if (!patientId) {
            console.log('Invalid data in update location ');
            return;
        }
        const careTaker = await careTakerModel.findOne({ assignedPatients: { $in: [patientId] } });
        if (!careTaker) {
            console.log('No careTaker found for patient ' + patientId);
            return;
        }
        if (socket.to(careTaker.socketId).emit('updateLocation', data)) {
            console.log('location send from ' + patientId + ' to ' + careTaker._id);
        }

    } catch (error) {
        consoleq.log(error);
    }

}

export default updateLocation;  