const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const pembelianGarung = sq.define('pembelianGarung',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaBarangGarung:{
        type:DataTypes.STRING
    },
    hargaGarung:{
        type:DataTypes.INTEGER
    },
    jumlahGarung:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    satuanGarung:{
        type:DataTypes.STRING
    },
    tanggalGarung:{
        type:DataTypes.DATE
    }
    
},
{

});

pembelianGarung.sync({ alter: true })
module.exports = pembelianGarung