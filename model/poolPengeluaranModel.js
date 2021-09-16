const { DataTypes } = require('sequelize')
const sq = require('../config/connection')
const setoran = require('./setoranModel')

const poolPengeluaran = sq.define('poolPengeluaran',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaPengeluaran:{
        type:DataTypes.STRING
    },
    hargaPengeluaran:{
        type:DataTypes.INTEGER
    },
    jumlahPengeluaran:{
        type:DataTypes.INTEGER,
        defaultValue:1
    }
},
{

});

poolPengeluaran.belongsTo(setoran)
setoran.hasMany(poolPengeluaran)

poolPengeluaran.sync({ alter: true })
module.exports = poolPengeluaran