const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const masterBarangGrafik = sq.define('masterBarangGrafik',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaBarang:{
        type:DataTypes.STRING
    }
},
{

});



masterBarangGrafik.sync({ alter: true })
module.exports = masterBarangGrafik