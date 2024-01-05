// import mongoose from "mongoose";
// import careTakerModel from "../../models/careTaker.model.js";
// import patientModel from "../../models/patient.model.js";

// const allocateCaretaker = async ({ caretakerId, patientId }) => {

//     try {
//         const { caretakerId, patientId } = req.query;
//         if (!mongoose.Types.ObjectId.isValid(caretakerId) || !mongoose.Types.ObjectId.isValid(patientId))
//             return ({ success: false, message: "Invalid Ids" })

//         const caretaker = await careTakerModel.findById(caretakerId);
//         if (!caretaker)
//             return ({ success: false, message: "Caretaker not found" })

//         const patient = await patientModel.findById(patientId);
//         if (!patient)
//             return ({ success: false, message: "Patient not found" })

//         if (!caretaker.assignedPatients.includes(patientId)) {
//             caretaker.assignedPatients.push(patientId);
//             await caretaker.save();
//             return ({ success: true, message: "Caretaker assigned to patient" })
//         }
//         else
//             return ({ success: true, message: "Caretaker already assigned to patient" })

//     } catch (error) {
//         console.error(error.message);
//         return ({ success: false, message: error.message });
//     }

// }
// export default allocateCaretaker