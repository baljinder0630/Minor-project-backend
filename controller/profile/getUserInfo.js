import patientModel from "../../models/patient.model.js";
import careTakerModel from "../../models/careTaker.model.js";

const getUserInfo = async (req, res) => {

    const { userId, role } = req.body;
    console.log(userId, role)
    if (!userId || !role) {
        return res.status(400).json({
            success: false,
            message: "UserId or role is not provided"
        })
    }
    if (role !== "patient" && role !== "careTaker") {
        return res.status(400).json({
            success: false,
            message: "Role is not valid"
        })
    }

    if (role === "patient") {
        const patient = await patientModel.findOne({ _id: userId });
        if (!patient) {
            return res.status(400).json({
                success: false,
                message: "Patient not found"
            })
        }
        return res.status(200).json({
            success: true,
            userId: patient.userId,
            name: patient.name,
            id: patient._id,
            email: patient.email,
            // phoneNumber: patient.phoneNumber
        })
    }
    else if (role === "careTaker") {
        const careTaker = await careTakerModel.findOne({ _id: userId });
        if (!careTaker) {
            return res.status(400).json({
                success: false,
                message: "CareTaker not found"
            })
        }
        return res.status(200).json({
            success: true,
            userId: careTaker.userId,
            // phoneNumber: careTaker.phoneNumber,
            id: careTaker._id,
            email: careTaker.email,
            name: careTaker.name,
        })

    }
}
export default getUserInfo;