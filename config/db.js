import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const connection = mongoose.createConnection(process.env.MONGODB_URI).on('open', () => { console.log("MongoDB Connected"); }).on('error', () => {
    console.log("MongoDB Connection error");
});

export default connection