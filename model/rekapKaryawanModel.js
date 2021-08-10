const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');
const karyawan=require('../model/karyawanModel')
const rekapKaryawan = sq.define('rekapKaryawan',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ILK:{
        type:DataTypes.STRING
    },
    nominal:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    cashBon:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    upahDiterima:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    keterangan:{
        type:DataTypes.STRING
    },
    bulan:{
        type:DataTypes.INTEGER
    },
    tahun:{
        type:DataTypes.INTEGER
    }
},
{
// paranoid:true
});

rekapKaryawan.belongsTo(karyawan)
karyawan.hasMany(rekapKaryawan)

rekapKaryawan.sync({ alter: true })
module.exports = rekapKaryawan