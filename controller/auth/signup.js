import isEmail from "validator/lib/isemail"
import bcrypt from "bcrypt"

const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    if (!email || !isEmail(email) || !password) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Credentials'
        })
    }

    const saltedPassword = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, saltedPassword);

}
export default signup