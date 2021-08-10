const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const pembelian = sq.define('pembelian',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaBarang:{
        type:DataTypes.STRING
    },
    harga:{
        type:DataTypes.INTEGER
    },
    jumlah:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    satuan:{
        type:DataTypes.STRING
    },
    tanggal:{
        type:DataTypes.DATE
    }
    
},
{

});

pembelian.sync({ alter: true })
module.exports = pembelian