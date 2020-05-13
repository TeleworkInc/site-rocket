const { rocketLog, spawnGatsby } = require('../../utils/processes');
const yamlayout = require('yamlayout');
const chalk = require('chalk');

const build = async() => {

    rocketLog("Building project...");
    yamlayout.build();
    await spawnGatsby('build');

}

module.exports = build;