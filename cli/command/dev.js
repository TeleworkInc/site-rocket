const process = require('process');
const path = require('path');
const chalk = require('chalk');
const chokidar = require('chokidar');
const { insideProject, spawn, error, success, BackgroundCommand, callGatsby } = require('../utils/processes');
const { build, compile } = require('yamlayout');

const projectDir = path.resolve('.'),
      devDir = path.resolve('./dev'),
      gatsbyDir = path.resolve('./build'),
      gatsbyOutput = path.resolve(gatsbyDir, 'src');

const compileProject = async () => await build(
    devDir, { outputDir: gatsbyOutput }
);

const gatsbyDevelop = async (public = false) => {
    var developArgs = ['develop'];
    process.chdir('build');

    if (public) developArgs.push('--host=0.0.0.0');
    await spawn('gatsby', developArgs);
}

const dev = async(public = false) => {

    // don't flag initial adds
    chokidar
        .watch(devDir, {
            ignoreInitial: true,
        })
        .on('all', compileProject);

    console.log("\nPreparing development bundle. Use", chalk.bgBlue(' site-rocket build '), "to create a production build.\n");

    await compileProject();
    await gatsbyDevelop(public);
    
}

module.exports = dev;