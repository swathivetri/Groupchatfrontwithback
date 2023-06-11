var jwt = require('jsonwebtoken');
const User = require('../models/users')
const path=require('path');



// console.log(decoded.id);
exports.authentication=(async(req,res,next)=>{
    try {
        console.log("i am authentication");
        const token=req.header('Authorization');
        var decoded = jwt.verify(token, 'secretkey')
        
       const userdetail= await User.findByPk(decoded.userid);
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