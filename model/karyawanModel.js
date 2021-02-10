const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const karyawan = sq.define('karyawan',{
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
        type:DataTypes.STRING,
        defaultValue:""
    }
    
},
{
paranoid:true
});

karyawan.sync({ alter: true })
module.exports = karyawan