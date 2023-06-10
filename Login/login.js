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
    if(response.status === 200){
            alert(response.data.message)
            console.log(response.data)
            localStorage.setItem( response.data);
            
    }else {
        throw new Error('Failed to login')
    }
    }catch(err){
        document.body.innerHTML += `<div style="color:red;">${err.message} <div>`
    }
}
