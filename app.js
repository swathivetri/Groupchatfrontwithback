const path = require('path');

const express = require('express');
const cors = require('cors')


const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();

const sequelize = require('./util/database');
const User = require('./models/users');
const userchattable=require('./models/messagetable');
const grouptable=require('./models/grouptable');
const usergrouptbble=require('./models/usergroup');


const userRoutes = require('./routes/user')
const bodyperser= require('body-parser');
const messageRoutes= require('./routes/message');
const groupRoutes= require('./routes/group');





app.use(cors());
app.use(bodyperser.urlencoded({extended:true}));
app.use(bodyperser.json());

 //app.use(bodyParser.urlencoded());  ////this is for handling forms
app.use(express.json());  //this is for handling jsons

app.use('/user', userRoutes)
app.use(messageRoutes);
app.use(groupRoutes);


User.hasMany(userchattable);
userchattable.belongsTo(User);

grouptable.hasMany(userchattable);
userchattable.belongsTo(grouptable);



User.belongsToMany(grouptable,{ through: usergrouptbble });
grouptable.belongsToMany(User, { through: usergrouptbble });

grouptable.hasMany(usergrouptbble);
User.hasMany(usergrouptbble);


sequelize.sync()
    .then(() => {
        app.listen(3000)
    })
    .catch(err => {
        console.log(err);
    })


