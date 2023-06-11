const express=require('express');
const router=express.Router();
const userchatC=require('../controller/userchat')
const authentication=require('../middleware/auth');

//  router.post('/addchat',authentication.authentication,userchatC.Adduserchat);
 router.get('/fetchchat',authentication.authentication, userchatC.fetchChat);
  router.get('/fetchNewMessage',authentication.authentication,userchatC.fetchNewMessge)

// router.get('/fetchNewMessage',(req,res)=>{
//     console.log("hello ajay");
// })
 module.exports=router;