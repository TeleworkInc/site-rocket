const build = require('./bin/build');
const create = require('./bin/create');
const dev = require('./bin/dev');
const serve = require('./bin/serve');
const prod = require('./bin/prod');
const clean = require('./bin/clean');

module.exports = { build, prod, create, dev, serve, clean }