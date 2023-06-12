const express = require('express');

const userController = require('../controller/user');

const router = express.Router();

const authentication=require('../middleware/auth');

const userDetail=require('../controller/userchat')



router.post('/adduserdetail',userController.addUserDetail);
router.post('/login',userController.loginUser);
router.get('/UserDetail',authentication.authentication,userDetail.UserDetail);
router.get('/AddNewUser',authentication.authentication,userController.AddNerUser)


module.exports = router;