import jwt, { decode } from "jsonwebtoken"
import patientModel from "../../models/patient.model.js";
import dotenv from "dotenv";
import careTakerModel from "../../models/careTaker.model.js";
dotenv.config();
const refreshToken = async (req, res, next) => {

    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(404).json({ success: false, message: 'No refresh token was found' });//if no cookies with name 'jwt' is present return

    try {

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


        if (role == 'patient') {
            const patient = await patientModel.findOne({ refreshToken: refreshToken });
            if (!patient) {
                // token reused detected
                jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    async (err, decoded) => {
                        if (err) return res.status(404).json({ success: false, message: "Refresh token reused" })
                        // hacked user
                        const hackedUser = await patientModel.findOne({ email: decoded.email }).exec();
                        console.log(hackedUser)
                        hackedUser.refreshToken = [];
                        await hackedUser.save();

                        return res.status(404).json({ success: false, message: "Refresh token reused" })
                    }
                )
            }
            else {
                const newRefreshTokenArray = patient.refreshToken.filter((token) => token !== refreshToken);

                jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    async (err, decoded) => {
                        if (err) {
                            patient.refreshToken = [...newRefreshTokenArray];
                            await patient.save();
                        }
                        if (err || patient.email !== decoded.email) return res.status(404).json({ success: false, message: 'expired refresh token or email did not matched' });

                        const email = patient.email;
                        const patientId = patient._id;
                        const accessToken = jwt.sign(
                            { email, patientId, role: 'patient' },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '1d' }
                        );
                        const newRefreshToken = jwt.sign(
                            { email, patientId, role: 'patient' },
                            process.env.REFRESH_TOKEN_SECRET,
                            { expiresIn: '7d' }
                        );

                        patient.refreshToken = [...newRefreshTokenArray, newRefreshToken];
                        await patient.save();
                        return res.status(200).json({
                            success: true,
                            message: 'New Access Token assigned successfully',
                            newAccessToken: accessToken,
                            newRefreshToken: newRefreshToken,
                            userId: decoded.patientId,
                            role: 'patient'
                        })

                    }
                )
            }
        }

        else if (role == 'careTaker') {
            const careTaker = await careTakerModel.findOne({ refreshToken: refreshToken });
            if (!careTaker) {
                // token reused detected
                jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    async (err, decoded) => {
                        if (err) return res.status(404).json({ success: false, message: "Refresh token reused" })
                        // hacked user
                        const hackedUser = await careTakerModel.findOne({ email: decoded.email }).exec();
                        hackedUser.refreshToken = [];
                        await hackedUser.save();

                        return res.status(404).json({ success: false, message: "Refresh token reused" })
                    }
                )
            }
            else {
                const newRefreshTokenArray = careTaker.refreshToken.filter((token) => token !== refreshToken);

                jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    async (err, decoded) => {
                        if (err) {
                            careTaker.refreshToken = [...newRefreshTokenArray];
                            await careTaker.save();
                        }
                        if (err || careTaker.email !== decoded.email) return res.status(404).json({ success: false, message: 'expired refresh token or email did not matched' });

                        const email = careTaker.email;
                        const careTakerId = careTaker._id;
                        const accessToken = jwt.sign(
                            { email, careTakerId, role: 'careTaker' },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '1d' }
                        );
                        const newRefreshToken = jwt.sign(
                            {
                                email, careTakerId, role: 'careTaker'
                            },
                            process.env.REFRESH_TOKEN_SECRET,
                            { expiresIn: '7d' }
                        );

                        careTaker.refreshToken = [...newRefreshTokenArray, newRefreshToken];
                        await careTaker.save();
                        return res.status(200).json({
                            success: true,
                            message: 'New Access Token assigned successfully',
                            newAccessToken: accessToken,
                            newRefreshToken: newRefreshToken,
                            userId: decoded.careTakerId,
                            role: 'careTaker'

                        })

                    }
                )

            }
        }
        else
            return res.status(404).json({ success: false, message: "Invalid refresh token" })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
export default refreshToken