import mongoose from 'mongoose';
import db from "../config/db.js"


const TaskSchema = new mongoose.Schema({
    "id": { type: String },
    "title": { type: String },
    "note": { type: String },
    "category": { type: String },
    "time": { type: String },
    "date": { type: String },
    "assignedBy": { type: String },
    "isCompleted": { type: Boolean },
    "from": { type: String, required: true },
    "to": { type: String, required: true },
})

const Task = db.model('tasks', TaskSchema);

export default Task;