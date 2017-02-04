'use strict';
module.exports = function(sequelize, DataTypes) {
	//var units = require('./units')(sequelize, DataTypes);
	var tags = sequelize.define('tags', {
		tag: DataTypes.STRING,
		tagID:{
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
			
		},
	}, 

	{
		classMethods: {
			associate: function(models) {
				/* tags and answer relation */
				tags.belongsToMany(models.answers, {through:'tags_answers',foreignKey:'tag_id',as:'tags_answers'});
				models.answers.belongsToMany(models.tags, {through:'tags_answers',foreignKey:'answer_id',as:'tags_answers'});
				/********************/

				/*--- Tags and system Relation */
				tags.belongsToMany( models.systems, { as: 'taggables',through: 'taggables',foreignKey: 'tag_id',as:'system_tags'});
				/*---------------------------*/

				/*Tags and projects */
				tags.belongsToMany( models.projects, { as: 'taggables',through: 'taggables',foreignKey: 'tag_id',as:'projects_tags'});
				models.projects.belongsToMany( models.tags, { as: 'taggables',through: 'taggables',foreignKey: 'taggable_id',as:'projects_tags'});

				/*-----------------------------*/

				/*Tags and units*********/
				tags.belongsToMany( models.units, { as: 'taggables',through: 'taggables',foreignKey: 'tag_id',as:'units_tags'});
				models.projects.belongsToMany( models.tags, { as: 'taggables',through: 'taggables',foreignKey: 'taggable_id',as:'units_tags'});

				/**************************/


}

			}
		}
	
	);
	return tags;
};
