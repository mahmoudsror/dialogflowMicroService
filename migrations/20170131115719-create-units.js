'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('units', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      projectId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'projects',
            key: 'id'
        }
      },
      unitName: {
        type: Sequelize.STRING
      },
      unitLink: {
        type: Sequelize.STRING
      },
      unitImage: {
        type: Sequelize.STRING
      },
      unitSubtitle: {
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
    return queryInterface.dropTable('units');
  }
};