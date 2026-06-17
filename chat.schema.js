import mongoose from "mongoose";

let chatSchema=new mongoose.Schema({
  userName:String,
message:String,
timestamp:{type:Date,
  default:Date.now
},
})
export let chatModel=mongoose.model("chat",chatSchema); 