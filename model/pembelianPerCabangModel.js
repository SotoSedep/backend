const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const pembelianPerCabang = sq.define('pembelianPerCabang',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaCabang:{
        type:DataTypes.STRING
    },
    namaBarangPerCabang:{
        type:DataTypes.STRING
    },
    hargaPerCabang:{
        type:DataTypes.INTEGER
    },
    jumlahPerCabang:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    satuanPerCabang:{
        type:DataTypes.STRING
    },
    tanggalPerCabang:{
        type:DataTypes.DATE
    }
    
},
{

});

pembelianPerCabang.sync({ alter: true })
module.exports = pembelianPerCabang