const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const masterPengeluaran = sq.define('masterPengeluaran',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaPengeluaran:{
        type:DataTypes.STRING
    },
    hargaPengeluaran:{
        type:DataTypes.INTEGER
    },
    
},
{

});

masterPengeluaran.sync({ alter: true })
module.exports = masterPengeluaran