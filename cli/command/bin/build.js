const { devDir, gatsbyOutputDir, projectCheck, rocketLog, spawnGatsby } = require('../../utils/processes');
const yamlayout = require('yamlayout');

const build = async() => {

    // exit if not inside project
    if(!projectCheck()) return;

    rocketLog("Building project...");
    await yamlayout.build({
        input: devDir,
        output: gatsbyOutputDir,
        root: devDir
    });
    await spawnGatsby('build');

}

module.exports = build;