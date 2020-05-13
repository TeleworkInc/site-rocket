#!/usr/bin/node

const process = require('process');
const cli = require('../cli');
const { insideProject, error } = require('../cli/utils/processes');

if (!insideProject())
        return error('Not inside a Site Rocket project.');

cli.init();
process.on('SIGINT', () => {
    error("\nCaught SIGINT! Killing child processes, including running servers.");
    process.kill(-process.pid);
    process.exit();
});