const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');
const karyawan = require('./karyawanModel')

const absensi = sq.define('absensi',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    absen:{
        type:DataTypes.INTEGER
    },
    tanggalAbsen:{
        type:DataTypes.DATE
    },
    absenStghHari:{
        type:DataTypes.INTEGER
    },
    gaji:{
        type:DataTypes.INTEGER
    },
    kasbon:{
        type:DataTypes.INTEGER
    },
    cabangAbsensi:{
        type:DataTypes.STRING
    }
},
{

});

absensi.belongsTo(karyawan)
karyawan.hasMany(absensi)



absensi.sync({ alter: true })
module.exports = absensi