const {
   override,
   disableEsLint,
   overrideDevServer,
   watchAll,
   addWebpackAlias
} = require('customize-cra');
const path = require('path');

module.exports = {
   webpack: override(
      // usual webpack plugin
      disableEsLint(),
      addWebpackAlias({
         ['@']: path.resolve(__dirname, './src')
      })
   ),
   devServer: overrideDevServer(
      // dev server plugin
      watchAll()
   )
};