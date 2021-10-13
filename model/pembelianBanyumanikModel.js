const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const pembelianBanyumanik = sq.define('pembelianBanyumanik',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaBarangBanyumanik:{
        type:DataTypes.STRING
    },
    hargaBanyumanik:{
        type:DataTypes.INTEGER
    },
    jumlahBanyumanik:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    satuanBanyumanik:{
        type:DataTypes.STRING
    },
    tanggalBanyumanik:{
        type:DataTypes.DATE
    }
    
},
{

});

pembelianBanyumanik.sync({ alter: true })
module.exports = pembelianBanyumanik