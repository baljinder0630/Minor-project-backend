import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("MongoDB Connected Successfully");
        })
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export { connectDb }