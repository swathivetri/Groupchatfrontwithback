const express=require('express');
const router=express.Router();
const groupchat=require('../controller/groupchat')
const authentication=require('../middleware/auth');

router.post('/createGroup', authentication.authentication, groupchat.CreateGroup);
router.get('/FetchGroupName', authentication.authentication, groupchat.FetchGroupName)
router.post('/addGroupMessage', authentication.authentication, groupchat.AddGroupchatMessage);
router.get('/fetchGroupChat', authentication.authentication, groupchat.fetchGroupMessage);
router.post('/AddNewUserToGroup', groupchat.AddNewUserToGroup)
router.get('/fetchGroupUser', authentication.authentication, groupchat.fetchGroupUser)
router.put('/RemoveUserFromGroup', groupchat.RemoveUserFromGroup);
router.get('/fetchGroupAdmin', authentication.authentication, groupchat.fetchGroupAdmin)
router.put('/MakeAdminToUser', groupchat.MakeAdminToUser)
router.get('/checkAdmin',authentication.authentication, groupchat.UserAdmin)

module.exports=router;