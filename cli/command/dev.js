const process = require('process');
const path = require('path');
const chalk = require('chalk');
const chokidar = require('chokidar');
const { insideProject, error, success, BackgroundCommand, callGatsby } = require('../utils/processes');
const { build, compile } = require('yamlayout');

const compileProject = () => build('./dev', {
    outputDir: './build/src'
});

// don't flag initial adds
chokidar
    .watch('dev', {
        ignoreInitial: true,
    })
    .on('all', compileProject);

process.on('message', async(msg) => {
    if (msg.command != 'run') return;
    await callGatsby('develop');
});

module.exports = async() => {
    if (!insideProject())
        return error('Not inside a Site Rocket project.');
        
    const background = new BackgroundCommand('dev', { silent: false }).open();

    console.log("\nPreparing development bundle. Use", chalk.bgBlue(' site-rocket build '), "to create a production build.\n");

    compileProject();

    await background.send({ command: 'run' });
    await process.on('SIGINT', () => {
        error("\nCaught SIGINT! Killing child processes, including running servers.");
        process.kill(-background.pid);
        process.exit();
    });
}