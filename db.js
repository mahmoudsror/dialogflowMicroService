
var sequelize = require('sequelize');
sequelize = new sequelize('botbackenddb', 'root', 'xwwx1111', {
  host: '127.0.0.1',
  dialect: 'mysql',
define: {timestamps: false},
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});
module.exports = sequelize;
