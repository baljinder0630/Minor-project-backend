import patientModel from "../../models/patient.model.js";
import careTakerModel from "../../models/careTaker.model.js";

const getUserInfo = async (req, res) => {

    const { email, role } = req.body;

    if (!email || !role) {
        return res.status(400).json({
            success: false,
            message: "Email or role is not provided"
        })
    }
    if (role !== "patient" && role !== "careTaker") {
        return res.status(400).json({
            success: false,
            message: "Role is not valid"
        })
    }

    if (role === "patient") {
        const patient = await patientModel.findOne({ email: email });
        if (!patient) {
            return res.status(400).json({
                success: false,
                message: "Patient not found"
            })
        }
        return res.status(200).json({
            success: true,
            email: patient.email,
            name: patient.name,
            id: patient._id,
            // phoneNumber: patient.phoneNumber
        })
    }
    else if (role === "careTaker") {
        const careTaker = await careTakerModel.findOne({ email: email });
        if (!careTaker) {
            return res.status(400).json({
                success: false,
                message: "CareTaker not found"
            })
        }
        return res.status(200).json({
            success: true,
            email: careTaker.email,
            // phoneNumber: careTaker.phoneNumber,
            id: careTaker._id,
            name: careTaker.name,
        })

    }
}
export default getUserInfo;