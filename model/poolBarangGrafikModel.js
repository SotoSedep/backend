const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');
const masterBarangGrafik= require('./masterBarangGrafikModel')

const poolBarangGrafik = sq.define('poolBarangGrafik',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    shift:{
        type:DataTypes.INTEGER
    },
    jumlah:{
        type:DataTypes.INTEGER
    },
    tanggal:{
        type:DataTypes.DATE
    }
},
{

});

poolBarangGrafik.belongsTo(masterBarangGrafik,{foreignKey:'masterBarangGrafikId'})
masterBarangGrafik.hasMany(poolBarangGrafik,{foreignKey:'masterBarangGrafikId'})


poolBarangGrafik.sync({ alter: true })
module.exports = poolBarangGrafik