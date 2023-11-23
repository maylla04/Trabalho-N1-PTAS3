const { Sequelize } = require('sequelize');
const config = require('../config/config')
require('dotenv').config();
const pg = require('pg');

const sequelize = new Sequelize(config.development.url, {
  define: {
    timetamps: true,
    underscored: true,
  },
  dialectModule: pg
});

try {
  sequelize.authenticate();
  console.log(' Conectado com o banco de dados ');
} catch (error) {
  console.error(' Atenção, a conexão falhou', error);
}

module.exports = { Sequelize, sequelize };