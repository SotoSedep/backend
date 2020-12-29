const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const menu = sq.define('menu',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaMenu:{
         type:DataTypes.STRING,
         defaultValue:''
    },
    harga:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    jenis:{
        type:DataTypes.STRING,
        defaultValue:""
    }
    
},
{
paranoid:true
});

menu.sync({ alter: true })
module.exports = menu