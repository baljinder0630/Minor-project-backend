import UserServices from "../../service/user.service.js"
const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const duplicate = await UserServices.getUserByEmail(email)

        if (duplicate) {
            console.log("User already exits")
            throw new Error(`Invalid Data`)
        }

        const response = await UserServices.registerUser(email, password)

        console.log("User registered successfully")
        res.status(200).json({ status: true, success: "User registered successfully" })

    } catch (error) {
        console.log(error)
        next(error)
    }
}
export default signup