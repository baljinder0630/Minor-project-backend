import mongoose from "mongoose";
import patientModel from "../../models/patient.model.js";

const getLocation = async (req, res) => {
    const { patientId } = req.query; // Use destructuring to extract patientId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.status(400).json({ success: false, message: 'Invalid patientId' });
    }

    try {
        const patient = await patientModel.findById(patientId);

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        const { latitude, longitude } = patient;

        if (!latitude || !longitude) {
            return res.status(404).json({ success: false, message: 'Location not found' });
        }

        return res.status(200).json({ success: true, latitude, longitude, message: 'Location found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export default getLocation;
