const chalk = require('chalk');
const { rocketLog, spawnGatsby } = require('../../utils/processes');

const serve = async () => {
    rocketLog("Starting production server...");
    await spawnGatsby('serve');
}

module.exports = serve;