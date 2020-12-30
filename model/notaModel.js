const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const nota = sq.define('nota',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomorNota:{
         type:DataTypes.STRING,
         defaultValue:''
    },
    NomorMeja:{
        type:DataTypes.STRING,
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

nota.sync({ alter: true })
module.exports = nota