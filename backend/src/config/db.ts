import config from "./config.js";
import mongoose  from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(`${config.db.uri}`);
        console.log("DB connected successfully");
    }catch(err){
       throw new Error("Error in connecting to DB");
    }
}

export default connectDB;