const { rocketLog, spawnGatsby } = require('../../utils/processes');
const chalk = require('chalk');

const build = async() => {

    rocketLog("Building project...");
    await spawnGatsby('build');
    
}

module.exports = build;