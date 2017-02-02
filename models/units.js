'use strict';
module.exports = function(sequelize, DataTypes) {
  var units = sequelize.define('units', {
         id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        /*references: {
            model: 'taggables',
            key: 'taggable_id'
        },*/

      },
    projectId: {
        type: DataTypes.INTEGER,
        references :  { model: "projects", key: "id" }

    },
          unitName: {
        type: DataTypes.STRING
      },
      unitLink: {
        type: DataTypes.STRING
      },
      unitImage: {
        type: DataTypes.STRING
      },
      unitSubtitle: {
        type: DataTypes.STRING
      },
  },
   {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
/*                units.belongsTo(models.project,{foreignKey: 'projectId'});*/
   units.belongsTo(models.projects, {foreignKey: 'projectId',foreignKeyConstraint: true, as:'project_units'});
/*units.belongsToMany(models.tags, {through:'taggables'});
*/

      }
    }
  });
  return units;
};


