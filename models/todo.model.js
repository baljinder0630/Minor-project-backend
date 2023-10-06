import { Schema } from "mongoose";
import userModel from "./user.model.js";
import db from "../config/db.js"

const todoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: userModel.modelName
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

const todoModel = db.model("todo", todoSchema)
export default todoModel