const { devDir, gatsbyOutputDir, projectCheck, rocketLog, spawnGatsby } = require('../../utils/processes');
const yamlayout = require('yamlayout');
const clean = require('./clean');

const build = async() => {

    // exit if not inside project
    // clean
    if(!projectCheck()) return;
    await clean();

    rocketLog("Building project...");
    await yamlayout.build({
        input: devDir,
        output: gatsbyOutputDir,
        root: devDir
    });
    await spawnGatsby('build');

}

module.exports = build;