const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

module.exports = {

    show: () => {
        clear();

        const rocketText = fs.readFileSync(
            path.join(__dirname, '..', '/rocket.txt'), 'utf-8'
        );

        console.log(
            chalk.blueBright(rocketText), '\n'
        );

        console.log(
            chalk.blue(
                figlet.textSync('Site Rocket')
            ), '\n\n'
        );
    }

};