const email=document.getElementById('email');
const password=document.getElementById('pwd');

 async function loginChecking(event)
 {
    try {
         if(email.value.trim()!="" && password.value.trim()!=""){
            event.preventDefault();
            console.log(email.value);
            console.log(password.value);
            const loginData={
                email:email.value,
                password:password.value,
            }
            const respose=await axios.post("http://localhost:3000/user/login",loginData);
            console.log(respose.data.userdata);
            if(respose.data.success===true)
            {
                
                    console.log(respose.data.msg+""+respose.data.userdata);
                    localStorage.setItem("token",respose.data.userdata);
                    alert("Login Successfull");
                    location.href='../View/GroupPage.html'
            }
            if(respose.data.success===false)
            {
                alert(respose.data.msg);
            }
         }else{
                alert("Some Field might be empty");
         }

    } catch (error) {
            console.log(error);
    }
 }