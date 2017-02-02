'use strict';
module.exports = function(sequelize, DataTypes) {
//  var system = require('./project')(sequelize, DataTypes);
  var tags_answers = sequelize.define('tags_answers', {
     id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tag_id: {
        type: DataTypes.INTEGER
      },
      answer_id: {
        type: DataTypes.INTEGER
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE
      },

  }, 

  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here




      }
    }
  });
  return tags_answers;
};
