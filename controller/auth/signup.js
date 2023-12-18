import isEmail from "validator/lib/isEmail.js";
import careTakerModel from "../../models/careTaker.model.js";
import patientModel from "../../models/patient.model.js";
import bcrypt from "bcrypt";

const signup = async (req, res, next) => {
    try {
        const { role } = req.query;
        console.log(role);
        const { email, password, firstName, lastName, phoneNumber } = req.body;

        if (!email || !isEmail(email) || !firstName || !password) {
            return res.json({ success: false, message: "Some fields are empty" });
        }

        let hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

        if (role === 'patient') {
            const duplicate = await patientModel.findOne({ email });
            if (duplicate) {
                return res.json({ success: false, message: "Patient already exists" });
            }

            const patient = new patientModel({ email, password: hashedPassword, firstName, lastName, phoneNumber });
            await patient.save();

            console.log("Patient registered successfully");
            return res.status(200).json({ status: true, success: "Patient registered successfully" });
        } else if (role === 'careTaker') {
            const duplicate = await careTakerModel.findOne({ email });
            if (duplicate) {
                console.log("Caretaker already exists");
                return res.json({ success: false, message: "Caretaker already exists" });
            }

            const careTaker = new careTakerModel({ email, password: hashedPassword, firstName, lastName, phoneNumber });
            await careTaker.save();

            console.log("Caretaker registered successfully");
            return res.status(200).json({ status: true, success: "CareTaker registered successfully" });
        } else {
            return res.status(404).json({ success: false, message: 'Invalid role' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

export default signup;
