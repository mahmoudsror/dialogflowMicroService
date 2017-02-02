'use strict';
module.exports = function(sequelize, DataTypes) {
	//var units = require('./units')(sequelize, DataTypes);
	var users = sequelize.define('users', {
		id:{
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		}
	}, 

	{
		classMethods: {
			associate: function(models) {
				// associations can be defined here
users.hasMany(models.systems, {onUpdate: 'CASCADE', foreignKey: 'user_id' ,as:'user_systems'});
			}
		}
	});
	return users;
};
