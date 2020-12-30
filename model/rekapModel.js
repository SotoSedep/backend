const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');
const nota = require('./notaModel')

const rekap = sq.define('rekap',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaMenu:{
         type:DataTypes.STRING,
         defaultValue:''
    },
    totalHarga:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    jumlah:{
        type:DataTypes.INTEGER,
        defaultValue:""
    }
    
},
{
paranoid:true
});

rekap.belongsTo(nota)
nota.hasMany(rekap)

rekap.sync({ alter: true })
module.exports = rekap