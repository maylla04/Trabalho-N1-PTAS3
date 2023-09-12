const { Sequelize } = require('sequelize');
const config = require('../config/config')
require('dotenv').config();

const sequelize = new Sequelize(  config.development  );

try {
  sequelize.authenticate();
  console.log(' Conectado com o banco de dados ');
} catch (error) {
  console.error(' Atenção, a conexão falhou', error);
}

module.exports = { Sequelize, sequelize };