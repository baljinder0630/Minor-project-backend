import careTakerModel from "../../models/careTaker.model.js";
import patientModel from "../../models/patient.model.js";

const registerSocket = async (userId, role, socket) => {

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
}
export default registerSocket;