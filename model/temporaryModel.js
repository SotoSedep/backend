const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');
const users = require('./usersModel')
const menu = require('./menuModel')

const temporary = sq.define('temporary',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    totalHarga:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    jenis:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    nomorMeja:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    status:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    jumlah:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    atasNama:{
        type:DataTypes.STRING,
        defaultValue:""
    }
    
},
{
paranoid:true
});

temporary.belongsTo(users)
users.hasMany(temporary)

temporary.belongsTo(menu)
menu.hasMany(users)


temporary.sync({ alter: true })
module.exports = temporary