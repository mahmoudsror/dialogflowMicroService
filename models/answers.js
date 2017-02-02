'use strict';
module.exports = function(sequelize, DataTypes) {
//  var system = require('./project')(sequelize, DataTypes);
  var answers = sequelize.define('answers', {
     id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      answer: {
        type: DataTypes.STRING
      },
      page_id: {
        type: DataTypes.STRING
      },


  }, 

  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      answers.belongsToMany(models.tags, {through:'tags_answers',foreignKey:'answer_id',as:'tags_answers'});
      models.tags.belongsToMany(answers, {through:'tags_answers',foreignKey:'tag_id',as:'tags_answers'});



      }
    }
  });
  return answers;
};
