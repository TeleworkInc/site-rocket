const process = require('process');
const { insideProject, error, success, BackgroundCommand, callGatsby } = require('../utils/processes');

process.on('message', async(msg) => {
    console.log("Starting production server...");
    if(msg.command != 'run') return; 
    await callGatsby('serve');
});

module.exports = async () => {
    if (!insideProject()) return error('Not inside a Site Rocket project.');
    const background = new BackgroundCommand('serve').open();

    await background.send({ command: 'run' });
    await process.on('SIGINT', () => {
        error("\nCaught SIGINT! Killing child processes, including running servers.");
        process.kill(-background.pid);
        process.exit();
    });
}