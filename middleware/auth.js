var jwt = require('jsonwebtoken');
const usertable=require('../models/userdetailtable')
const path=require('path');



// console.log(decoded.id);
exports.authentication=(async(req,res,next)=>{
    try {
        console.log("i am authentication");
        const token=req.header('Authorization');
        var decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        
       const userdetail= await usertable.findByPk(decoded.userid);
       if(userdetail===null)
       {
            console.log("this is not valid user");
            // res.redirect('/View/login.htm');
             res.status(401).send({success:false,msg:"user not found"});
            // res.redirect('/View/login.htm'); 

       }else{
            req.user=userdetail;
            next();
       }
    } catch (error) {
        console.log("very bad feeling");
        res.status(401).send({success:false,msg:"user is not valid"});
          
        
    }
});