'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('shops', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        alloNull: false,
      },
      name: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      cnpj_cpf: {
        type: Sequelize.STRING,
        alloNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'managers', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at:{
        type: Sequelize.DATE,
        alloNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        alloNull: false,
      }
     });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('shops');
  }
};
