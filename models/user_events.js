'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_events = sequelize.define('user_events', {
    page_id: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_events;
};