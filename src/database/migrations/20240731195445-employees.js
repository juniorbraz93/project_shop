'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('employees', { 
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
      address: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      document: {
        type: Sequelize.STRING,
        alloNull: false,
        unique: true,
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
    await queryInterface.dropTable('employees');
  }
};
