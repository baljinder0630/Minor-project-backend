import mongoose from "mongoose";
import db from "../config/db.js"
import patientModel from "./patient.model.js";

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
    },
    assignedPatients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: patientModel.modelName
    }]
}, { timestamps: true });




const careTakerModel = db.model('careTaker', careTakerSchema)
export default careTakerModel