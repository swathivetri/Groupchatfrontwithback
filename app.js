const path = require('path');

const express = require('express');
const cors = require('cors')


const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();

const sequelize = require('./util/database');
const User = require('./models/users');


const userRoutes = require('./routes/user')





app.use(cors());


// app.use(bodyParser.urlencoded());  ////this is for handling forms
app.use(express.json());  //this is for handling jsons

app.use('/user', userRoutes)


//app.use((req, res) => {
  //  console.log('urlll', req.url);
//res.sendFile(path.join(__dirname, 'Login/login.html'));
//})
app.get("/data",(req,res) => {
    res.json({name:"swathi",favouriteFood:"rice"})
})


sequelize.sync()
    .then(() => {
        app.listen(3000)
    })
    .catch(err => {
        console.log(err);
    })


