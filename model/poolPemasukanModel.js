const { DataTypes } = require('sequelize')
const sq = require('../config/connection')
const setoran = require('./setoranModel')

const poolPemasukan = sq.define('poolPemasukan',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaPemasukan:{
        type:DataTypes.STRING
    },
    hargaPemasukan:{
        type:DataTypes.INTEGER
    },
    jumlahPemasukan:{
        type:DataTypes.INTEGER,
        defaultValue:1
    }
},
{

});

poolPemasukan.belongsTo(setoran)
setoran.hasMany(poolPemasukan)

poolPemasukan.sync({ alter: true })
module.exports = poolPemasukan