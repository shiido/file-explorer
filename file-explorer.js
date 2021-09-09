const chalk = require('chalk');
const cmd = require('node-cmd');

const log = console.log;
const warning = chalk.hex('#FFA500');

const args = process.argv.slice(2);

if (args.length === 0) {
   log(`\n${chalk.yellowBright('You must specify at least one directory to monitor it')}
      For example: ${chalk.greenBright('node file-explorer.js ~/Desktop')} \n`);
   process.exit();
}

const baseURLBackend = 'http://localhost:3011';
const baseURLFrontend = 'http://localhost:3000';

log(`\nFile explorer will deploy two services:

   ${chalk.gray('Backend [Nest App]  ')} ---> ${chalk.green(baseURLBackend)}
   ${chalk.gray('Frontend[React App] ')} ---> ${chalk.greenBright(baseURLFrontend)}
`);

console.log(warning('Deploying backend service ...'));
cmd.run('cd file-explorer-backend && npm start');

setTimeout(function () {
   console.log(warning('Deploying frontend service ... \n'));
   cmd.run(`cd file-explorer-frontend && REACT_APP_FOLDERS=${args.join(",")} npm start`);
}, 5000);