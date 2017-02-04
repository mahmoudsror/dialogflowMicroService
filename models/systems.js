'use strict';
module.exports = function(sequelize, DataTypes) {
//  var system = require('./project')(sequelize, DataTypes);
  var systems = sequelize.define('systems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        
        type: DataTypes.INTEGER,
       references: {
                    model: 'taggables',
                    key: 'taggable_id'
                  },
      },
      systemName: {
        type: DataTypes.STRING
      },
      systemLink: {
        type: DataTypes.STRING
      },
      numOfProjects: {
        type: DataTypes.STRING
      },
      systemImage: {
        type: DataTypes.STRING
      },
      facebookPageId : {
        type: DataTypes.STRING
      }, 
      user_id : {
        type: DataTypes.INTEGER,
        references :  { model: 'users', key: 'id' }
      },

  }, 

  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
/*        project.hasMany(models.units,{foreignKey: "projectId"});
*/
systems.hasMany(models.projects, {onUpdate: 'CASCADE', foreignKey: 'systemId',as:'system_projects'});
systems.belongsTo(models.users, {onUpdate: 'CASCADE', foreignKey: 'user_id' ,as:'user_systems'});
/*systems.hasMany(models.units, {onUpdate: 'CASCADE', foreignKey: 'systemId',as:'system_units'});
*/
/*--- Tags and system Relation */
        systems.belongsToMany( models.tags, { as: 'taggables',through: 'taggables',foreignKey: 'tag_id',as:'system_tags' ,otherKey: 'taggable_id'});

        /*---------------------------*/

      }
    }
  });
  return systems;
};
