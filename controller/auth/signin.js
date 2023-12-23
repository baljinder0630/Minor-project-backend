import bcrypt from "bcrypt"
import patientModel from "../../models/patient.model.js";
import careTakerModel from "../../models/careTaker.model.js";
import jwt from "jsonwebtoken"
const signin = async (req, res, next) => {
    try {
        const { role } = req.query
        const { email, password, existingRefreshToken } = req.body;

        if (!email || !password) {
            return res.json({ "success": false, "message": "Invalid Fields" })

        }

        if (role == 'patient') {

            let patient = await  patientModel.findOne({ email })
            if (!patient) {
                return res.json({ "success": false, "message": "Patient not exist" })
            }
            const isPasswordCorrect = await bcrypt.compare(password, patient.password)
            if (isPasswordCorrect === false) {
                return res.status(404).json({ "success": false, "message": 'Invalid Password or email' });
            }

            const accessToken = jwt.sign({ email, patientId: patient._id ,role:"patient"}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

            const refreshToken = jwt.sign({ email, patientId: patient._id ,role :"patient"}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

            // when existingRefreshToken is not empty, remove it from patient.refreshToken array (refreshing the token condition)
            let newRefreshTokenArray = existingRefreshToken == "" ? patient.refreshToken : patient.refreshToken.filter((token)=>token!==existingRefreshToken);

            if(existingRefreshToken != ""){
                /*
                Scenario added here: 
                    1) User logs in but never uses RT and does not logout 
                    2) RT is stolen
                    3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
                */

                const refreshToken = existingRefreshToken;
                const foundToken = await patientModel.findOne({ refreshToken: refreshToken }).exec();
                // Detected refresh token reuse!
                if (!foundToken) {
                    // console.log('attempted refresh token reuse at login!')
                    // clear out ALL previous refresh tokens
                    console.log("token reuse detected, clearing all refresh tokens")
                    newRefreshTokenArray = [];
                }
            }

            patient.refreshToken = [...newRefreshTokenArray, refreshToken];
            await patient.save();

            res.status(200).json({ "success": true, "message": 'Signin Successful', accessToken, refreshToken });

        }
        else if (role == 'careTaker') {

            let careTaker =await  careTakerModel.findOne({ email })
            if (!careTaker) {
                return res.json({ "success": false, "message": "CareTaker not exist" })
            }

            const isPasswordCorrect = await bcrypt.compare(password, careTaker.password)
            if (isPasswordCorrect === false) {
                return res.status(404).json({ "success": false, "message": 'Invalid Password or email' });
            }


            const accessToken = jwt.sign({ email, caretakerId: careTaker._id ,role:'careTaker'}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

            const refreshToken = jwt.sign({ email, caretakerId: careTaker._id ,role:"careTaker"}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

            // when existingRefreshToken is not empty, remove it from caretaker.refreshToken array (refreshing the token condition)
            let newRefreshTokenArray = existingRefreshToken == "" ? careTaker.refreshToken : careTaker.refreshToken.filter((token) => token !== existingRefreshToken);

            if (existingRefreshToken != "") {
                /*
                Scenario added here: 
                    1) User logs in but never uses RT and does not logout 
                    2) RT is stolen
                    3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
                */

                const refreshToken = existingRefreshToken;
                const foundToken = await careTakerModel.findOne({ refreshToken: refreshToken }).exec();
                // Detected refresh token reuse!
                if (!foundToken) {
                    // console.log('attempted refresh token reuse at login!')
                    // clear out ALL previous refresh tokens
                    console.log("token reuse detected, clearing all refresh tokens")
                    newRefreshTokenArray = [];
                }
            }

            careTaker.refreshToken = [...newRefreshTokenArray, refreshToken];
            await careTaker.save();
            res.status(200).json({ "success": true, "message": 'Signin Successful', accessToken, refreshToken });

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
