const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('SotoSedep', 'postgres', 'academy', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging:false,
  });

  module.exports =  sequelize;