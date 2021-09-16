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
        type:DataTypes.DATEONLY
    },
    absenStghHari:{
        type:DataTypes.INTEGER
    },
    gaji:{
        type:DataTypes.INTEGER
    },
    kasbon:{
        type:DataTypes.INTEGER
    }
},
{

});

absensi.belongsTo(karyawan)
karyawan.hasMany(absensi)



absensi.sync({ alter: true })
module.exports = absensi