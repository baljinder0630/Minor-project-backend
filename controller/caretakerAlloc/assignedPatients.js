import mongoose from "mongoose";
import careTakerModel from "../../models/careTaker.model.js";
 
const assignedPatients = async (req, res) => {

    const { caretakerId } = req.query;
    if (!mongoose.Types.ObjectId.isValid(caretakerId))
        return res.status(400).send({ success: false, message: "Invalid Id" })

    try {
        const patientIds = await careTakerModel.findById(caretakerId).select("assignedPatients");
        if (!patientIds)
            return res.status(404).send({ success: false, message: "Caretaker not found" })
        return res.status(200).send({ success: true, patientIds:patientIds.assignedPatients, message: "Patient Ids found" })
        
    } catch (error) {
        console.error(error.message);
        return res.status(400).send({ success: false, message: error.message });
    }
}
export default assignedPatients