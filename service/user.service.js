import userModel from "../models/user.model.js"
import Jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

class UserServices {
    static async registerUser(email, password) {
        try {

            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(password, salt)


            const createUser = new userModel({ email, password: hashPass })
            return await createUser.save()
        } catch (error) {
            throw error
        }
    }

    static async getUserByEmail(email) {
        try {
            return await userModel.findOne({ email })
        } catch (error) {
            throw error
        }
    }

    static async generateAccessToken(tokenData, JWTSecret_key, JWT_EXPIRE) {
        return Jwt.sign(tokenData, JWTSecret_key, { expiresIn: JWT_EXPIRE })
    }
}

export default UserServices