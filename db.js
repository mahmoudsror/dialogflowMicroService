
var sequelize = require('sequelize');
sequelize = new sequelize('botbackenddb', 'root', '9c95YY', {
  host: '127.0.0.1',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});
module.exports = sequelize;