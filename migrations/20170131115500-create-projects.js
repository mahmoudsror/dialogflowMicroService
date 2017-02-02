'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('projects', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      projectName: {
        type: Sequelize.STRING
      },
      projectLink: {
        type: Sequelize.STRING
      },
      numOfUnits: {
        type: Sequelize.INTEGER
      },
      systemId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'systems',
            key: 'id'
        }
      },
      projectImage: {
        type: Sequelize.STRING
      },
      projectSubtitle: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('projects');
  }
};


