#!/usr/bin/node

const process = require('process');
const cli = require('../cli');
const { insideProject, error } = require('../cli/utils/processes');

// else set up CLI and SIGINT trigger
cli.init();
process.on('SIGINT', () => {
    error("\nCaught SIGINT! Killing child processes, including running servers.");
    process.exit();
    process.kill(-process.pid);
});