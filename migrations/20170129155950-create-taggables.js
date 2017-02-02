'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    
    return queryInterface.createTable('taggables', {

      tag_id: {
        type: Sequelize.INTEGER
      },
      taggable_id: {
       type: Sequelize.INTEGER
          },
      taggable_type: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('taggables');
  }
};