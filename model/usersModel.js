const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const users = sq.define('users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
         type:DataTypes.STRING,
         defaultValue:''
    },
    password:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    nama:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    alamat:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    handphone:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
    
},
{
paranoid:true
});

users.sync({ alter: true })
module.exports = users