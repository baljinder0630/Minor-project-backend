import jwt from "jsonwebtoken";
import patientModel from "../../models/patient.model.js";
import careTakerModel from "../../models/careTaker.model.js";

const verifyToken = async (req, res, next) => {

    const { token } = req.body;
    try {

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.status(404).json({ success: false, message: "Invalid token" })
                }
                else {
                    let user;
                    if (decoded.role == 'patient')
                        user = await patientModel.findOne({ email: decoded.email });
                    else if (decoded.role == 'careTaker')
                        user = await careTakerModel.findOne({ email: decoded.email });

                    if (!user)
                        return res.status(404).json({ success: false, message: "User not found" })

                    console.log(decoded)
                    return res.status(200).json({
                        success: true, message: "Valid token",
                        email: decoded.email,
                        
                        role: decoded.role,
                        userId: decoded.role == 'patient' ? decoded.patientId : decoded.caretakerId
                    })
                }

            }
        )

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
export default verifyToken
