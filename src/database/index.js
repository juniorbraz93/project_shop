const Sequelize = require('sequelize');
const dbConfig = require('../config/database.js');

const connection = new Sequelize(dbConfig);


// const NOME_DO_MODEL = require('../app/models/NOME_DO_MODEL.js');
const Admin = require('../app/models/Admin.js');
const Manager = require('../app/models/Manager.js');
const Shop = require('../app/models/Shop.js');
const Employee = require('../app/models/Employee.js');
const Product = require('../app/models/Product.js');


// Inicializa os modelos
// NOME_DO_MODEL.init(connection);
Admin.init(connection);
Manager.init(connection);
Shop.init(connection);
Employee.init(connection);
Product.init(connection);


// Setup associations
Admin.associate(connection.models);
Manager.associate(connection.models);
Shop.associate(connection.models);
Employee.associate(connection.models);
Product.associate(connection.models);


// try {
//     connection.authenticate()
//     console.log('Connection is sucessfully');
// } catch (error) {
//     console.log(`Erro: ${error}`);
// }

module.exports = connection;