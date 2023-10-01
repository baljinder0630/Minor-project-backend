import mongoose from "mongoose";
import bcrypt from "bcrypt"
import db from "../config/db.js"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "Email can't be empty"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, { timestamps: true });




const userModel = db.model('user', userSchema)
export default userModel