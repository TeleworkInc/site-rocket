const process = require('process');
const { insideProject, error, success, BackgroundCommand, callGatsby } = require('../utils/processes');
const chalk = require('chalk');

process.on('message', async (msg) => {
    if (msg.command != 'run') return;
    await callGatsby('build');
});

module.exports = async(closeOnFinish = true) => {
    if (!insideProject()) return error('Not inside a Site Rocket project.');
    const background = new BackgroundCommand('build', { silent: false }).open();

    console.log("Building project...");

    await background.send({ command: 'run' });
    await background.on('exit', () => closeOnFinish ? process.exit() : false);
    // await background.on('exit', () => console.log(
    //     chalk.blueBright("\nSUCCESS!"),
    //     "Start the production server with:",
    //     chalk.bold.blue("site-rocket serve")
    // ));
    await process.on('SIGINT', () => {
        error("\nCaught SIGINT! Killing child processes, including running servers.");
        process.kill(-background.pid);
        process.exit();
    });
}