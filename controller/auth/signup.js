import isEmail from "validator/lib/isEmail.js";
import careTakerModel from "../../models/careTaker.model.js";
import patientModel from "../../models/patient.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const signup = async (req, res, next) => {

    try {

        const { role } = req.query;
        const { email, password, name, phoneNumber } = req.body;

        if (!email || !isEmail(email) || !name || !password) {
            return res.json({ success: false, message: "Some fields are empty" });
        }

        let hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

        if (role.toLowerCase() == 'patient') {

            const duplicate = await patientModel.findOne({ email });
            if (duplicate) {
                return res.json({ success: false, message: "Patient already exists" });
            }
            const patient = new patientModel({ email, password: hashedPassword, name, phoneNumber });

            const accessToken = jwt.sign({ email, patientId: patient._id, role: "patient" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

            const refreshToken = jwt.sign({ email, patientId: patient._id, role: "patient" }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

            patient.refreshToken.push(refreshToken);
            await patient.save();

            return res.status(200).json({ success: true, message: "Patient registered successfully", accessToken, refreshToken });
        }
        else if (role.toLowerCase() == 'caretaker') {

            const duplicate = await careTakerModel.findOne({ email });
            if (duplicate) {
                return res.json({ success: false, message: "Caretaker already exists" });
            }

            const careTaker = new careTakerModel({ email, password: hashedPassword, name, phoneNumber });
            await careTaker.save();

            // console.log("Caretaker registered successfully");
            const accessToken = jwt.sign({ email, careTaker: careTaker._id, role: "careTaker" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

            const refreshToken = jwt.sign({ email, careTaker: careTaker._id, role: "careTaker" }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

            careTaker.refreshToken.push(refreshToken);
            await careTaker.save();

            return res.status(200).json({ success: true, message: "CareTaker registered successfully", accessToken, refreshToken });

        }

        return res.status(404).json({ success: false, message: 'Invalid role' });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

export default signup;
