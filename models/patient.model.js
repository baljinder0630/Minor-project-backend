import mongoose from "mongoose";
import db from "../config/db.js"

const patientSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "Email can't be empty"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });




const patientModel = db.model('patient', patientSchema)
export default patientModel