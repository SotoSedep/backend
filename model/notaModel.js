const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');
const meja = require('./mejaModel')

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
    atasNama:{
        type:DataTypes.STRING,
        defaultValue:""
    }
    
},
{
paranoid:true
});

nota.belongsTo(meja)
meja.hasMany(nota)

nota.sync({ alter: true })
module.exports = nota