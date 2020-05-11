const build = require('./build');
const serve = require('./serve');
const { BackgroundCommand } = require('../utils/processes');

process.on('message', async (msg) => {
    if (msg.command != 'run') return;
    await build(false);
    await serve();
});

module.exports = async () => {
    const background = new BackgroundCommand('prod', { silent: false }).open();
    await background.send({ command: 'run' });
    // await background.on('exit', () => closeOnFinish ? process.exit() : false);
    await process.on('SIGINT', () => {
        error("\nCaught SIGINT! Killing child processes, including running servers.");
        process.kill(-background.pid);
        process.exit();
    });
};