import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\nMongoDB Connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGO DB CONNECTION FAILED: ", error);
        process.exit();
    }
}

export {connectDB}