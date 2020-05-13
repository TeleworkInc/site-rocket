const { projectCheck, rocketLog, spawnGatsby } = require('../../utils/processes');
const yamlayout = require('yamlayout');
const chalk = require('chalk');

const build = async() => {

    // exit if not inside project
    if(!projectCheck()) return;

    rocketLog("Building project...");
    yamlayout.build();
    await spawnGatsby('build');

}

module.exports = build;