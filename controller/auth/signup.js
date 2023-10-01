import isEmail from "validator/lib/isemail"

const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    if (!email || !isEmail(email) || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please provide values for email, contactNumber, and password.'
        })
    }
}
export default signup