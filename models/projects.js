'use strict';
module.exports = function(sequelize, DataTypes) {
  //var units = require('./units')(sequelize, DataTypes);
  var projects = sequelize.define('projects', {
    projectName: DataTypes.STRING,
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references :  { model: "taggables", key: "taggable_id" }

    },
    systemId: {
        type: DataTypes.INTEGER,
        references :  { model: "systems", key: "id" }

    },
          projectLink: {
        type: DataTypes.STRING
      },
      numOfUnits: {
        type: DataTypes.INTEGER
      },

      projectImage: {
        type: DataTypes.STRING
      },
      projectSubtitle: {
        type: DataTypes.STRING
      },
  }, 

  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
/*        project.hasMany(models.units,{foreignKey: "projectId"});
*/
projects.hasMany(models.units, { foreignKey: 'projectId' ,foreignKeyConstraint: true,as:'project_units'});
projects.belongsTo(models.systems, {foreignKey: 'systemId', foreignKeyConstraint:true,as:'system_projects'});
projects.belongsToMany(models.tags, {through:'taggables',foreignKey:'tag_id',as:'project_tags'});

      }
    }
  });
  return projects;
};
