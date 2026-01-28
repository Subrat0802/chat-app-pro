import mongoose from "mongoose";

const db = async () => {
    try{
        mongoose.connect("process.env.DATABASE_URL");
        console.log("DB connected successfully");
    }catch(error){
        console.log("Error while connecting to db");
        process.exit(1);
    }
}