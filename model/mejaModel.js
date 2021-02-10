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
    flagging:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
    
},
{
paranoid:true
});

meja.sync({ alter: true })
module.exports = meja