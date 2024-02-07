import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import patientModel from '../../models/patient.model.js';
import careTakerModel from '../../models/careTaker.model.js';

dotenv.config();


const logout = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        if (!refreshToken) return res.status(404).json({ success: false, message: 'No refresh token was found' });
        let role = "";
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.status(404).json({ success: false, message: "Invalid refresh token" })
                }
                else {
                    role = decoded.role;
                    console.log(decoded)
                }
            }
        )

        if (role == "patient") {
            let user = await patientModel.findOne({ refreshToken: refreshToken });
            if (!user) {
                return res.status(404).json({ success: false, message: "Invalid refresh token" })
            }
            const newRefreshTokenArray = user.refreshToken.filter((token) => token !== refreshToken);
            user.refreshToken = [...newRefreshTokenArray];
            await user.save();
            return res.status(200).json({ success: true, message: "Logged out successfully" })
        } else if (role == "careTaker") {
            let user = await careTakerModel.findOne({ refreshToken: refreshToken });
            if (!user) {
                return res.status(404).json({ success: false, message: "Invalid refresh token" })
            }
            const newRefreshTokenArray = user.refreshToken.filter((token) => token !== refreshToken);
            user.refreshToken = [...newRefreshTokenArray];
            await user.save();
            return res.status(200).json({ success: true, message: "Logged out successfully" })
        }
        return res.status(404).json({ success: false, message: "Invalid refresh token" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export default logout;
