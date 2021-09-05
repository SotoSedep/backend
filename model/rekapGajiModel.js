const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');
const karyawan = require('./karyawanModel')

const rekapGaji = sq.define('rekapGaji',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    gajiHarian:{
        type:DataTypes.INTEGER
    },
    gajiBulanan:{
        type:DataTypes.INTEGER
    },
    jumlahMasuk:{
        type:DataTypes.INTEGER
    },
    bulan:{
        type:DataTypes.INTEGER
    },
    tahun:{
        type:DataTypes.INTEGER
    },
    cashBon:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
},
{

});

rekapGaji.belongsTo(karyawan)
karyawan.hasMany(rekapGaji)



rekapGaji.sync({ alter: true })
module.exports = rekapGaji