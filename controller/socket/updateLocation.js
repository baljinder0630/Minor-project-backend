import careTakerModel from "../../models/careTaker.model.js";
import { careTakers } from "../../serverMap.js";

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
        // console.log(careTaker.id)
        const careTakerSocket = careTakers.get(careTaker.id)
        if (!careTakerSocket) {
            console.log("Caretaker offline")
            return;
        }
        if (socket.to(careTakerSocket).emit('updateLocation', data)) {
            console.log('location send from ' + patientId + ' to ' + careTakerSocket);
        }

    } catch (error) {
        console.log(error);
    }

}

export default updateLocation;  