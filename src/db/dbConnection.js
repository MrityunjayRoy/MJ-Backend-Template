import mongoose, { connect, mongo } from "mongoose";
import { DB_NAME } from "../constants.js";

const dbConnect = async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log("connected!");
    } catch (error) {
        console.log("Error in connecting with database", error);
    }
}

export default dbConnect;