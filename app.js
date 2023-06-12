const path = require('path');

const express = require('express');
const cors = require('cors')


const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();

const sequelize = require('./util/database');
const usertable=require('./models/userdetailtable');
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


usertable.hasMany(userchattable);
userchattable.belongsTo(usertable);

grouptable.hasMany(userchattable);
userchattable.belongsTo(grouptable);



usertable.belongsToMany(grouptable,{ through: usergrouptbble });
grouptable.belongsToMany(usertable, { through: usergrouptbble });

grouptable.hasMany(usergrouptbble);
usertable.hasMany(usergrouptbble);


sequelize.sync()
    .then(() => {
        app.listen(3000)
    })
    .catch(err => {
        console.log(err);
    })


