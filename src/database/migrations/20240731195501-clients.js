'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('managers', { 
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
      phone: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      email: {
        type: Sequelize.STRING,
        alloNull: false,
        unique: true,
      },
      cpf: {
        type: Sequelize.STRING,
        alloNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      district: {
        type: Sequelize.STRING,
        alloNull: false,  
      },
      city: {
        type: Sequelize.STRING,
        alloNull: false,  
      },
      state: {
        type: Sequelize.STRING,
        alloNull: false,  
      },
      shop_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'shops', key: 'id'},
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
    await queryInterface.dropTable('managers');
  }
};
