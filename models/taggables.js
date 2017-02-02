'use strict';
module.exports = function(sequelize, DataTypes) {
  //var units = require('./units')(sequelize, DataTypes);
  var taggables = sequelize.define('taggables', {

     tag_id:{ 
      type:DataTypes.INTEGER,
      references :  {model: "tags",  key: "id" }

     },
     taggable_id: {
      type:DataTypes.INTEGER
    },
     taggable_type: DataTypes.STRING
  }, 

  {
    classMethods: {
      associate: function(models) {

        // associations can be defined here

      }
    }
  });
  return taggables;
};
