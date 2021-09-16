const { DataTypes } = require('sequelize')
const sq = require('../config/connection')

const setoran = require('./setoranModel')

const poolPembelian = sq.define('poolPembelian',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaPembelian:{
        type:DataTypes.STRING
    },
    hargaPembelian:{
        type:DataTypes.INTEGER
    },
    jumlahPembelian:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
},
{

});

poolPembelian.belongsTo(setoran)
setoran.hasMany(poolPembelian)

poolPembelian.sync({ alter: true })
module.exports = poolPembelian