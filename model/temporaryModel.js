const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const karyawan = require('./karyawanModel')
const menu = require('./menuModel')
const meja = require('./mejaModel')

const temporary = sq.define('temporary',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    totalHarga:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    jenis:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    status:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    jumlah:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    atasNama:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    keterangan:{
        type:DataTypes.STRING,
        defaultValue:""
    }
    
},
{
});

temporary.belongsTo(karyawan)
karyawan.hasMany(temporary)

temporary.belongsTo(menu)
menu.hasMany(temporary)

temporary.belongsTo(meja)
meja.hasMany(temporary)


temporary.sync({ alter: true })
module.exports = temporary