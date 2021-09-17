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
    setor:{
        type:DataTypes.INTEGER
    },
    namaKasir:{
        type:DataTypes.STRING
    },
    totalKasbon:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
},
{

});

setoran.sync({ alter: true })
module.exports = setoran