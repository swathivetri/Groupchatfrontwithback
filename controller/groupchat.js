const grouptable=require('../models/grouptable');
const usergroup=require('../models/usergroup');
const messagetable=require('../models/messagetable')
 const Sequelize=require('../util/database');
  const sequelize=require('sequelize');
const { Op } = require('sequelize');
const usertable = require('../models/userdetailtable');
const queryInterface = Sequelize.getQueryInterface();



exports.CreateGroup=(async(req,res)=>{
  const t= await Sequelize.transaction();
    console.log("creategroup data"+req.body.groupname+req.body.groupUseridArray+req.user.id)
    try {
        const groupid=await grouptable.create({
            groupName:req.body.groupname,
        },{transaction:t});
    
        await usergroup.create({
          tbluserdetailId: req.user.id,
          grouptableId:groupid.id,
          isSuperAdmin:true
        },{transaction:t})

        const usergroupArray = req.body.groupUseridArray.map(userId => ({
          grouptableId: groupid.id,
          tbluserdetailId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        }));

         await queryInterface.bulkInsert('usergroups', usergroupArray,{transaction:t});
         await t.commit();
         res.send({success:true,msg:"Create group successfull"});
        
    } catch (error) {
        console.log(error);
        await t.rollback();
        res.send({success:false,msg:error});
    }
})

exports.FetchGroupName=(async (req,res)=>{
    try {
        // const groupName=await grouptable.findAll({where:{ }});

        console.log("userid"+req.user.id)
  const groupName = await grouptable.findAll({
    attributes: ['id', 'groupName', 'createdAt', 'updatedAt'],
    include: [{
      model: usergroup,
      attributes: [],
      where: {
        tbluserdetailId: `${req.user.id}`
      },
      required: true
    }]
  });
        res.send({success:true,groupname:groupName})
    } catch (error) {
        console.log(error);
    }
})


exports.AddGroupchatMessage=(async (req,res)=>{
    console.log(req.body.message);
    console.log(req.body.groupid);
    try {
   const response=await messagetable.create({
          message:req.body.message,
          tbluserdetailId:req.user.id,
          grouptableId:req.body.groupid,
      })
      
      res.send({success:true,msg:"successfull inserted"})
    } catch (error) {
      res.send({success:false,msg:error})
    }
   
})


exports.fetchGroupMessage=( async(req,res)=>{
  console.log("i am fetch new message");
   console.log(req.query.groupid);
  //  const 
    const lastmessageno=parseInt(req.query.lastmessageid) || -1
   
    try {
      const userchat= await messagetable.findAll({
       where:{
        id: { [Op.gt]:lastmessageno},
         grouptableId:req.query.groupid,
        // id: { [Op.gt]:req.query.lastmessageid}
       },
       include: [{
        model: usertable,
        attributes: ['username']
      }]
      })      

       res.send({success:true,userchat:userchat});
    } catch (error) {
      // console.log(error);
    }
    
    
});

exports.AddNewUserToGroup=(async (req,res)=>{
  console.log()
  for (let index = 0; index < req.body.groupUseridArray.length; index++) {
    usergroup.create({
        grouptableId:req.body.groupid,
        tbluserdetailId:req.body.groupUseridArray[index]
    })
}

})

exports.RemoveUserFromGroup=(async (req,res)=>{
  console.log()
    await usergroup.destroy({where:{
      grouptableId:req.body.groupid,
      tbluserdetailId:req.body.groupUseridArray
    }
        
    })


})

exports.fetchGroupUser=(async (req,res)=>{
  console.log()
const userDetail= await usertable.findAll({
    include: [{
      model: usergroup,
      where: {
        grouptableId:`${req.query.groupid}`,
        isSuperAdmin: false,
      }
    }]
  })
  res.send({success:true,userDetail:userDetail});
  console.log('userde'+userDetail)
})


exports.fetchGroupAdmin=(async (req, res) => {
  try {
    const userDetail = await usertable.findAll({
      include: [{
        model: usergroup,
        where:{
          grouptableId:`${req.query.groupid}`,
          isSuperAdmin: false,
          isAdmin:false
        }
    }]
    })
    res.send({success:true,userDetail:userDetail});
  } catch (error) {
    console.log(error);
  }
  
})


exports.MakeAdminToUser=( async(req, res) => {
  try {
    console.log("i am update")
    
    for (let index = 0; index < req.body.groupUseridArray.length; index++) {
      await usergroup.update(
        { isAdmin: true },
        { where: { tbluserdetailId:req.body.groupUseridArray[index],
                   grouptableId:req.body.groupid} 
                });
      
    }   
    
  } catch (error) {
    console.log(error);
  }
})


exports.UserAdmin=(async (req,res) => {
  try {
      const isAdmin=await usergroup.findOne({
        where:{
          tbluserdetailId:req.user.id,
          grouptableId:req.query.groupid
        }})

        console.log(isAdmin);
        
          res.send({success:true,isAdmin})
        

  } catch (error) {
      console.log(error);
  }
 
})