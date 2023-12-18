import mongoose from "mongoose";
import patientModel from "../../models/patient.model.js";

const getLocation = async (req, res) => {
    const {patientId} = req.body;
    if(mongoose.Types.ObjectId.isValid(patientId) === false){
        return res.status(400).json({success: false, message: 'Invalid patientId'});
    }
    const patient = await patientModel.findById(patientId);
    if(!patient){
        return res.status(404).json({success: false, message: 'patient not found'});
    }
    // console.log(patient);
    const {latitude, longitude} = patient;
    console.log(latitude, longitude);
    if(!latitude || !longitude){
        return res.status(404).json({success: false, message: 'Location not found'});
    }
    return res.status(200).json({success: true, latitude, longitude , message: 'Location found'});
}

export default getLocation;