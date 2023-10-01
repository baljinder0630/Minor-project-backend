import UserServices from "../../service/user.service.js";
import bcrypt from "bcrypt"
const signin = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }
        let user = await UserServices.getUserByEmail(email);
        if (!user) {
            throw new Error('User does not exist');
        }


        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (isPasswordCorrect === false) {

            throw new Error(`Username or Password does not match`);
        }

        // Creating Token

        let tokenData;
        tokenData = { _id: user._id, email: user.email };


        const token = await UserServices.generateAccessToken(tokenData, "secret", "1d")

        console.log("Signin successful")
        res.status(200).json({ status: true, success: "sendData", token: token });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

export default signin