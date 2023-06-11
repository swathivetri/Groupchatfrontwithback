const { Sequelize } = require('sequelize');
const chattable=require('../models/messagetable');
const user=require('../models/users');
const { Op } = require('sequelize'); 



exports.fetchChat=( async(req,res)=>{
      // const userchat= await chattable.findAll({
      //   attributes: ['message']
      // });
      try {
        const userchat= await chattable.findAll({
          include: [{
            model: user,
            attributes: ['username']
          }]
        })
  
         res.send({success:true,userchat:userchat});
      } catch (error) {
        console.log(error);
      }
      
});

exports.Adduserchat=(async (req,res)=>{
    console.log(req.body.message);
    try {
   const response = await chattable.create({
          message:req.body.message,
          userId:req.user.id
      })
      
      res.send({success:true,msg:"successfull inserted"})
    } catch (error) {
      res.send({success:false,msg:error})
    }
   
})

exports.fetchNewMessge=(async (req,res)=>{
  try {
          console.log("i ma calling"+req.query.lastmessageid);
          const userchat= await chattable.findAll({
            where: {
              id: { [Sequelize.Op.gt]:req.query.lastmessageid}
            },
            include: [{
              model: user,
              attributes: ['username']
            }]
          })
          console.log("ouput"+userchat.length)
          res.send({success:true,userchat:userchat});
  } catch (error) {
    
  }
 
})


exports.UserDetail=( async(req,res)=>{
  // const userchat= await chattable.findAll({
  //   attributes: ['message']
  // });
  try {
    const userDetail= await user.findAll({
      where: {
        id: {
          [Op.ne]: `${req.user.id}`
        }
      }
    });

     res.send({success:true,userDetail:userDetail});
  } catch (error) {
    console.log(error);
  }
  
});