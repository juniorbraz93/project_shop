const Sequelize = require('sequelize');
const dbConfig = require('../config/database.js');

const connection = new Sequelize(dbConfig);

// const NOME_DO_MODEL = require('../app/models/NOME_DO_MODEL.js');
const Admin = require('../app/models/Admin.js');


// Inicializa os modelos
// NOME_DO_MODEL.init(connection);
Admin.init(connection);


// Setup associations
// NOME_DO_MODEL.associate(connection.models);


// try {
//     connection.authenticate()
//     console.log('Connection is sucessfully');
// } catch (error) {
//     console.log(`Erro: ${error}`);
// }

module.exports = connection;