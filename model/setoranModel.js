const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const setoran = sq.define('setoran',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tanggal:{
        type:DataTypes.DATE
    },
    shift:{
        type:DataTypes.INTEGER
    },
    pendapatan:{
        type:DataTypes.INTEGER
    },
    pengeluaran:{
        type:DataTypes.INTEGER
    },
    setor:{
        type:DataTypes.INTEGER
    },
    beras:{
        type:DataTypes.INTEGER
    }
},
{

});

setoran.sync({ alter: true })
module.exports = setoran