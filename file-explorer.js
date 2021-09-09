var cmd = require('node-cmd');

const args = process.argv.slice(2);

console.log('starting backend ...');
cmd.run(
   `cd file-explorer-backend && npm start`, function (err, data, stderr) {
      console.log('backend ...', err, data, stderr);
   }
);

setTimeout(function () {
   console.log('starting frontend ...');
   cmd.run(
      `cd file-explorer-frontend && REACT_APP_FOLDERS=${args.join(",")} npm start`, function (err, data, stderr) {
         console.log('frontend ...', err, data, stderr);
      }
   );
}, 5000);