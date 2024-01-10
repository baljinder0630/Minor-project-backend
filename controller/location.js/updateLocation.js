// import mongoose from "mongoose";
// import patientModel from "../../models/patient.model.js";

// const updateLocation = async (req, res) => {
//     const { patientId,lat,long } = req.body;
//     if(!lat || !long){
//         return res.status(400).json({ success: false, message: 'Invalid location' });
//     }
//     if (mongoose.Types.ObjectId.isValid(patientId) === false) {
//         return res.status(400).json({ success: false, message: 'Invalid patientId' });
//     }
//     const patient = await patientModel.findByIdAndUpdate(patientId,{latitude:lat,longitude:long});
//     if (!patient) {
//         return res.status(404).json({ success: false, message: 'patient not found' });
//     }
//     return res.status(200).json({ success: true, message: 'Location updated'});
// }

// export default updateLocation;