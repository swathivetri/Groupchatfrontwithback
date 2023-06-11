const sequelize=require('sequelize');
const Sequelize=require('../util/database');

const messagetable=Sequelize.define('chattable',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    message:{
        type: sequelize.TEXT({ length: 'medium' }),
        collate: 'utf8mb4_unicode_ci'
    }
})

module.exports=messagetable;