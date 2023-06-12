const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messageList = document.querySelector(".message-list");




var uname=""; 
var userid=0;

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

(function(){
 const userdetail= parseJwt (localStorage.getItem('token'));
 console.log(userdetail);
 uname=userdetail.username;
 userid=userdetail.userid;
 console.log('userid'+userid);
 document.getElementById('username').innerText=userdetail.username;
}())

sendButton.addEventListener("click",  async function() {
  try {
    
  
  const message = messageInput.value.trim();
  const msg={
      message
  }
  const token=localStorage.getItem('token');
  const respone=await axios.post("http://localhost:3000/addchat",msg, {
    headers: {
      'Authorization':token
    }
  });
  
  console.log(respone);

  if(respone.data.success===true){
      
        // const newMessage = document.createElement("li");
        // newMessage.classList.add("message");
       
        // newMessage.innerHTML = `
          
        //   <div class="message-content">
        //     <p>${message}</p>
        //   </div>
        //   <div class="message-sender">
        //     <span>${uname}</span>
        //   </div>
        // `;
        
        // newMessage.style.textAlign = "right";
        // messageList.appendChild(newMessage); // add new message to the list
         messageInput.value = ""; // clear the input field
        // messageList.scrollTop = messageList.scrollHeight - messageList.clientHeight; // scroll to the bottom of the list
      
  }else{
    console.log("something went wrong");
  }

} catch (error) {
      console.log(error.response.status===401);
      if(error.response.status===401){
        unauthorizedUser(error);
      }
      console.log(error);
}
})

// observe changes to the message list element
const observer = new MutationObserver(function() {
  messageList.scrollTop = messageList.scrollHeight - messageList.clientHeight;
});
observer.observe(messageList, { childList: true });



window.addEventListener('DOMContentLoaded',async()=>{
  try {
    // const messgid=localStorage.getItem('Lastmessageid');
    // console.log("messageid",messgid);
    const token=localStorage.getItem('token');
    const userchat= await axios.get("http://localhost:3000/fetchchat",{
     headers: {
       'Authorization':token
     } 
   });
   const totalmesage= userchat.data.userchat.length
     
      localStorage.setItem('Lastmessageid',userchat.data.userchat[totalmesage-1].id);
     console.log(userchat.data);
     addMessageOnScreen(userchat);
  } catch (error) {
    // if(error.response.status===401){
    //   unauthorizedUser(error);
    // }
    console.log(error);
  }
  
});

// try {
//   setInterval(async() => {
//        const token=localStorage.getItem('token');
//         const LastMessageId=localStorage.getItem('Lastmessageid')
//         console.log(LastMessageId);
//     const userchat= await axios.get(`http://localhost:3000/fetchNewMessage?lastmessageid=${LastMessageId}`,{
//       headers: {
//         'Authorization':token
//       } 
//     });
//      console.log(userchat.data);
//      const totalmesage= userchat.data.userchat.length
//      console.log("totallen"+totalmesage);
//      if(totalmesage>0){
//          localStorage.setItem('Lastmessageid',userchat.data.userchat[totalmesage-1].id);
//         addMessageOnScreen(userchat);
//      }
//   }, 1000);
// } catch (error) {
//   console.log(error);
//   unauthorizedUser(error);
// }


function addMessageOnScreen(message)
{
  
  // messageList.innerHTML="";
  console.log(message);
  for (let index = 0; index < message.data.userchat.length; index++) {
     const newMessage = document.createElement("li");
     newMessage.classList.add("message");
        if(message.data.userchat[index].tbluserdetailId===userid)
        {
         
              newMessage.innerHTML =`
              <div class="message-content">
                <p>${message.data.userchat[index].message}</p>
              </div>
              <div class="message-sender">
                <span>You</span>
              </div>`;
            newMessage.style.textAlign = "right";
         }else{
                console.log("Hello swathi");
                newMessage.innerHTML = `
                <div class="message-sender">
                  <span>${message.data.userchat[index].tbluserdetail.username}</span>
                </div>
                <div class="message-content">
                  <p>${message.data.userchat[index].message}</p>
                </div>`;
              newMessage.style.textAlign= "left";
        
        // messageList.scrollTop = messageList.scrollHeight - messageList.clientHeight;
        }
        messageList.appendChild(newMessage);
      
  } 
}


function unauthorizedUser(error)
{
  try {
        if(error.response.status===401)
      {
        alert("You are unauthorized user"+error);
        location.href='login.htm';
      }
  } catch (error) {
      console.log(error);
  }
  
}