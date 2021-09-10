const chalk = require('chalk');
const cmd = require('node-cmd');
const tcpPortUsed = require('tcp-port-used');

const log = console.log;
const warning = chalk.hex('#FFA500');

const args = process.argv.slice(2);

if (args.length === 0) {
   log(`\n${chalk.yellowBright('You must specify at least one directory to monitor it')}
      For example: ${chalk.greenBright('node file-explorer.js ~/Desktop')} \n`);
   process.exit();
}

(async () => {
   const port3000 = await tcpPortUsed.check(3000, '127.0.0.1');
   const port3011 = await tcpPortUsed.check(3011, '127.0.0.1');
   const port8081 = await tcpPortUsed.check(8081, '127.0.0.1');

   if (!port3000 && !port3011 && !port8081) {

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

   } else {
      if (port3000) {
         log(`${chalk.yellowBright(`Port 3000 is in use`)}`);
      }
      if (port3011) {
         log(`${chalk.yellowBright(`Port 3011 is in use`)}`);
      }
      if (port8081) {
         log(`${chalk.yellowBright(`Port 8081 is in use`)}`);
      }
      process.exit();
   }
})();