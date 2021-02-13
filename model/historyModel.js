const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');
const meja = require('./mejaModel')
const karyawan = require('./karyawanModel')

const history = sq.define('history',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
},
{
paranoid:true
});

history.belongsTo(karyawan)
karyawan.hasMany(history)

history.belongsTo(meja)
meja.hasMany(history)

history.sync({ alter: true })
module.exports = history