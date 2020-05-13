#!/usr/bin/node

const process = require('process');
const cli = require('../cli');
const { insideProject, error } = require('../cli/utils/processes');

// exit if not inside project
if (!insideProject())
        return error('Not inside a Site Rocket project.');

// else set up CLI and SIGINT trigger
cli.init();
process.on('SIGINT', () => {
    error("\nCaught SIGINT! Killing child processes, including running servers.");
    process.kill(-process.pid);
    process.exit();
});