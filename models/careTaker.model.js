import mongoose from "mongoose";
import db from "../config/db.js"

const careTakerSchema = new mongoose.Schema({
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
    name: {
        type: String,
        required: true
    },
    socketId: {
        type: String
    },
    phoneNumber: {
        type: String,
        // required: true
    },
    refreshToken: [String],
    assignedPatients: [{
        type: mongoose.Schema.Types.ObjectId,
    }]
}, { timestamps: true });




const careTakerModel = db.model('careTaker', careTakerSchema)
export default careTakerModel