const { DataTypes } = require('sequelize');
const sequelize=require('../util/database');

const usergroup=sequelize.define('usergroup',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
      isAdmin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      },
      isSuperAdmin:{
       type: DataTypes.BOOLEAN,
       defaultValue:false
      }
});

module.exports=usergroup;