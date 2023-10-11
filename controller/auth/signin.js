import bcrypt from "bcrypt"
import patientModel from "../../models/patient.model.js";
import careTakerModel from "../../models/careTaker.model.js";
const signin = async (req, res, next) => {
    try {
        const { role } = req.query
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }

        if (role === 'patient') {

            let patient = patientModel.findOne({ email })
            if (!patient) {
                return res.json({ "success": false, "message": "Patient not exist" })
            }
            const isPasswordCorrect = await bcrypt.compare(password, patient.password)
            if (isPasswordCorrect === false) {
                return res.status(404).json({ "success": false, "message": 'Invalid Password or email' });
            }
            res.status(200).json({ "success": true, "message": 'Signin Successful' });

        }
        else if (role === 'careTaker') {

            let careTaker = careTakerModel.findOne({ email })
            if (!careTaker) {
                return res.json({ "success": false, "message": "CareTaker not exist" })
            }

            const isPasswordCorrect = await bcrypt.compare(password, careTaker.password)
            if (isPasswordCorrect === false) {
                return res.status(404).json({ "success": false, "message": 'Invalid Password or email' });
            }
            res.status(200).json({ "success": true, "message": 'Signin Successful' });

        }
        else {
            res.status(404).json({ "success": false, "message": 'Invalid role' });
        }



    } catch (error) {
        console.log(error)
        res.status(404).json({ "success": false, "message": 'Something went wrong' });

    }
}

export default signin