import "./dotenv.js"
import http from "http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import { chatModel } from "./chat.schema.js";
import { connectToMongoose } from "./config.js";
import { Socket } from "dgram";

let app=express();
let server=http.createServer(app)

let io=new Server(server,{
  cors:{
    origin:"*",
    methods:["GET","POST"]
  }  
})

let usersList=[];
io.on("connect",(socket)=>{
    console.log("connection is established");

    // join event
socket.on("join",(userName)=>{
    let user={
userName,
    socketId:socket.id,
    }
usersList.push(user)
let count=usersList.length;


  io.emit("countUserLive",{count,usersList})

    chatModel.find({}).sort({timestamp:1}).limit(50)
    .then((messages)=>{
    socket.emit("loadingMsg",messages)})
    .catch(err=> console.log(err))
    

})

// typing event
socket.on("typing",(userName)=>{
    socket.broadcast.emit("typingBroadcast",userName);
})

// new message event
socket.on("newMessage",async (userDetails)=>{
    userDetails.timestamp=Date.now();

let newChat=new chatModel({
    userName:userDetails.userName,
    message:userDetails.message,
    timestamp:userDetails.timestamp
})
await newChat.save();
io.emit("broadCastMsg",userDetails);
})



// disconnect event
    socket.on("disconnect",()=>{
            console.log("connection is disconnect");
  let socketId=socket.id
  usersList=usersList.filter((user)=>{
return user.socketId!==socketId
})
let count=usersList.length;
  io.emit("countUserLive",{count,usersList})


    })
})

server.listen(3000,()=>{
    console.log("server is live");
    connectToMongoose();
})