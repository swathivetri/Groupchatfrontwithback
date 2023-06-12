const sequelize = require('sequelize');
const Sequelize = require('../util/database');


const usertable=Sequelize.define('tbluserdetail',{
  id:{
      type:sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true,
  },
  username:sequelize.STRING,
  useremail:sequelize.STRING,
  mobile:sequelize.STRING,
  userpass:sequelize.STRING

});

module.exports=usertable;
