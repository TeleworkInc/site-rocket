const build = require('./build');
const serve = require('./serve');

const prod = async () => {
    await build();
    await serve();
}

module.exports = prod;