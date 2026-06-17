
let socket=io.connect("http://localhost:3000");
let username=document.querySelector("#user_Name")

let chatList=document.querySelector(".chatList");
let myChat=document.querySelector(".myChat");

let sendMsg=document.querySelector("#sendMsg");
let sendBtn=document.querySelector("#sendBtn");

let userCount=document.querySelector("#userCount");
let ul=document.querySelector("#ul")

let typingStatus=document.querySelector("#typingStatus")

// getting username
let userName=prompt("Enter your name");
if(userName){
socket.emit("join",userName);
username.innerText=userName;
}

// counting of user with server 
socket.on("countUserLive",({count,usersList})=>{
  ul.innerHTML="";
   userCount.innerText="connection " + count;
  usersList.forEach((list)=>{
  ul.insertAdjacentHTML("afterbegin",
    `<li id="${list.socketId}"><span class="my_big_bullet">&bull;</span>${list.userName}</li>
`)
  })
 
})

// sending typing emit when focus
sendMsg.addEventListener("input",(e)=>{
socket.emit("typing",userName)
})

// sendbtn clicking event
sendBtn.addEventListener("click",()=>{
    let message=sendMsg.value;

    let userDetails={
        userName:userName,
        message:message,
    }
        socket.emit("newMessage",userDetails);
        sendMsg.value=""
})
 
// loading msg for new user
socket.on("loadingMsg",(messages)=>{
  messages.forEach((msg)=>{
     chatList.innerHTML+=`
    <div class="singleChat">
              <div class="chatDetail">
                <h3>${msg.userName}</h3>
                <p>${new Date(msg.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</p>
              </div>
              <p>${msg.message}</p>
            </div>
          </div>
          
    `
  }) 
})

// typing broadcast event 
socket.on("typingBroadcast",(userName)=>{
  typingStatus.innerText=userName +" Typing..."
})


// broadcast event -showing msg to everyone
socket.on("broadCastMsg",(userDetails)=>{
    if(userDetails.userName===userName){
chatList.innerHTML+=`
    <div class="myChat">
              <div class="chatDetail">
                <h3>${userDetails.userName}</h3>
                <p>${new Date(userDetails.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</p>
              </div>
              <p>${userDetails.message}</p>
            </div>
          </div>
    `

    }else{
        chatList.innerHTML+=`
    <div class="singleChat">
              <div class="chatDetail">
                <h3>${userDetails.userName}</h3>
                <p>${new Date(userDetails.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</p>
              </div>
              <p>${userDetails.message}</p>
            </div>
          </div>
    `
    }

  
})







