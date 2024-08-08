const Sequelize = require('sequelize');
const dbConfig = require('../config/database.js');

const connection = new Sequelize(dbConfig);


// const NOME_DO_MODEL = require('../app/models/NOME_DO_MODEL.js');
const Admin = require('../app/models/Admin.js');
const Manager = require('../app/models/Manager.js');
const Shop = require('../app/models/Shop.js');


// Inicializa os modelos
// NOME_DO_MODEL.init(connection);
Admin.init(connection);
Manager.init(connection);
Shop.init(connection);


// Setup associations
Admin.associate(connection.models);
Manager.associate(connection.models);
Shop.associate(connection.models);


// try {
//     connection.authenticate()
//     console.log('Connection is sucessfully');
// } catch (error) {
//     console.log(`Erro: ${error}`);
// }

module.exports = connection;