
'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('systems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
         type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE'
      },
      systemName: {
        type: Sequelize.STRING
      },
      systemLink: {
        type: Sequelize.STRING
      },
      numOfProjects: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      systemImage: {
        type: Sequelize.STRING
      },
      facebookPageId : {
        type: Sequelize.STRING
      }, 

      tags : {
        type: Sequelize.STRING
      },
      deleted_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('systems');
  }
};
