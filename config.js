import mongoose from "mongoose";

let url=process.env.DB_URL;

export let connectToMongoose=async ()=>{
 await    mongoose.connect(url)
 console.log("mongoose is connected")
}