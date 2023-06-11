const express = require('express');

const userController = require('../controller/user');

const router = express.Router();

const authentication=require('../middleware/auth');

const userDetail=require('../controller/userchat')



router.post('/signup',userController.signup )

router.post('/login',userController.login )

router.get('/AddNewUser',authentication.authentication,userController.AddNewUser);

router.get('/UserDetail',authentication.authentication,userDetail.UserDetail);

module.exports = router;