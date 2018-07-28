const environment = require('./app/environment');
const server = require('./app/server');
module.exports = Object.assign(environment,server)
