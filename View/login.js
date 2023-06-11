const email = document.getElementById('email');
const password = document.getElementById('pwd');

async function login(e) {
    try{
    e.preventDefault();
    console.log(e.target.name);
   

    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value

    }
    console.log(loginDetails)
    const response = await axios.post('http://localhost:3000/user/login',loginDetails)
    console.log(response.data.userdata);
    if(response.data.success===true){
        console.log(response.data.message+""+response.data.userdata);   
            localStorage.setItem("token", response.data.userdata);
            alert("Login Successfull");
            location.href='GroupPage.html'

            if(response.data.success===false)
            {
                alert(response.data.msg);
            }
            
    }else {
        throw new Error('Failed to login')
    }
    }catch(err){
        document.body.innerHTML += `<div style="color:red;">${err.message} <div>`
    }
}
