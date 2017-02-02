'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
	return queryInterface.createTable('tags', {
	  tagID: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	  },
	  tag: {
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
	  },
	});
  },
  down: function(queryInterface, Sequelize) {
	return queryInterface.dropTable('tags');
  }
};
