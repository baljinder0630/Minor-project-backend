import mongoose from "mongoose";
import careTakerModel from "../../models/careTaker.model.js";
import patientModel from "../../models/patient.model.js";

const allocateCaretaker = async (req, res) => {

    try {
        const { caretakerId, patientId } = req.query;
         if (!mongoose.Types.ObjectId.isValid(caretakerId) || !mongoose.Types.ObjectId.isValid(patientId))
            return res.status(400).send({ success: false, message: "Invalid Ids" })

        const caretaker = await careTakerModel.findById(caretakerId);
        if (!caretaker)
            return res.status(404).send({ success: false, message: "Caretaker not found" })

        const patient = await patientModel.findById(patientId);
        if (!patient)
            return res.status(404).send({ success: false, message: "Patient not found" })

        if (!caretaker.assignedPatients.includes(patientId)) {
            caretaker.assignedPatients.push(patientId);
            await caretaker.save();
            return res.status(200).send({ success: true, message: "Caretaker assigned to patient" })
        }
        else
            return res.status(200).send({ success: true, message: "Caretaker already assigned to patient" })

    } catch (error) {
        console.error(error.message);
        return res.status(400).send({ success: false, message: error.message });
    }

}
export default allocateCaretaker