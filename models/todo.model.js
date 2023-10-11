import { Schema } from "mongoose";
import db from "../config/db.js"
import patientModel from "./patient.model.js";

const todoSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: patientModel.modelName
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
})

const todoModel = db.model("todo", todoSchema)
export default todoModel