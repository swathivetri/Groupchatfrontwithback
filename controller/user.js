const User = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


function isstringinvalid(string){
    if(string == undefined ||string.length === 0){
        return true
    } else {
        return false
    }
}

const signup = async (req, res)=>{
    try{
    const { name, email,number, password, } = req.body;
    console.log('email', email)
    if(isstringinvalid(name)  || isstringinvalid(number) || isstringinvalid(email || isstringinvalid(password))){
        return res.status(400).json({err: "Bad parameters . Something is missing"})
    }
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
        console.log(err)
        await User.create({ name, email, number, password: hash })
        res.status(201).json({message: 'Successfuly create new user'})
    })
    }catch(err) {
            res.status(500).json(err);
        }

}

const generateAccessToken = (id,name) => {
    return jwt.sign({ userId : id, name: name } ,process.env.TOKEN_SECRET);
}

const login = async (req, res) => {
    try{
    const { email, password } = req.body;
    if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({message: 'EMail idor password is missing ', success: false})
    }
    console.log(password);
    const user  = await User.findAll({ where : { email }})
        if(user.length > 0){
           bcrypt.compare(password, user[0].password, (err, result) => {
           if(err){
            throw new Error('Something went wrong')
           }
            if(result === true){
                return res.status(200).json({success: true, message: "User logged in successfully", token: generateAccessToken(user[0].id, user[0].name)})
            }
            else{
            return res.status(400).json({success: false, message: 'Password is incorrect'})
           }
        })
        } else {
            return res.status(404).json({success: false, message: 'User Doesnot exitst'})
        }
    }catch(err){
        res.status(500).json({message: err, success: false})
    }
}

const AddNewUser=(async(req,res)=>{
    console.log("i am here"+req.user.id+" "+req.query.groupid);
    try {
        // const result = await usertable.findAll({
        //     include: [
        //       {
        //         model: usergrouptable,
        //         where: { grouptableId: `${req.query.groupid}` },
        //         attributes: ['tbluserdetailId'],
        //         required: false
        //       }
        //     ],
        //     where: {
        //       '$usergroups.tbluserdetailId$': { [sequelize.Op.ne]: null }
        //     }
        //   });
    

        
        const result = await usertable.findAll({
            where: {
              id: {
                [Op.notIn]: sequelize.literal(`
                  (SELECT tbluserdetailId
                  FROM usergroups
                  WHERE grouptableId = ${req.query.groupid}
                )`)
              }
            },
            include: [{
              model: usergrouptable,
            //    where: { grouptableId: 19 },
              attributes: []
            }]
          });
          
          
          
          
          
          console.log(result);
          res.send({success:true,userDetail:result});
    } catch (error) {
        console.log(error);
    }
   
 })


module.exports = {
    signup,
    login,
    generateAccessToken,
    AddNewUser

}
