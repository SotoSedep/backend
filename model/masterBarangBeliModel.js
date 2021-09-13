const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const masterBarangBeli = sq.define('masterBarangBeli',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaBarangPembelian:{
        type:DataTypes.STRING
    },
    hargaBarangPembelian:{
        type:DataTypes.INTEGER
    },
    
},
{

});

masterBarangBeli.sync({ alter: true })
module.exports = masterBarangBeli