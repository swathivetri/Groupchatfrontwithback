const name=document.getElementById('name');
const email=document.getElementById('email');
const mobile=document.getElementById('mobile');
const password=document.getElementById('pwd');

 async function AddUser(event)
{
    event.preventDefault();
    console.log(name.value);
    try {
            if(name.value.trim()!="" && email.value.trim()!="" && email.value.trim()!="" && password.value.trim()!="" ){
            const UserData={
                name:name.value,
                email:email.value,
                mobile:mobile.value,
                password:password.value
            }
            
                const response= await axios.post("http://localhost:3000/user/adduserdetail",UserData);

                if(response.data.success===true)
                { 
                    alert("Insert  successfully");
                    window.location.href = "../View/login.html" 
                   
                }else {
                    alert("Email id Exists");

                }
            }else{
                alert("Might be some Field are empty");
            }
                // if(response.data)
                //  console.log(name.value);
      } catch (error) {
            console.log(error);
    }   
}