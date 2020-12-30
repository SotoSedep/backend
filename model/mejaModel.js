const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const meja = sq.define('meja',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomorMeja:{
         type:DataTypes.STRING,
         defaultValue:''
    },
    
},
{
paranoid:true
});

meja.sync({ alter: true })
module.exports = meja