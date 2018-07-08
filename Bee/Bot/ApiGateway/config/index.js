
const environment = require('./app/environment');
const server = require('./app/server');
const facebookPage = require('./app/facebookPage');
module.exports = Object.assign(environment,server,facebookPage)
