const merge = require('webpack-merge');
const webpack = require('webpack');

const { commonClientConfig, PATHS } = require('./webpack.common.js');

const APP_SERVER_PORT = process.env.PORT || 3000;

// Configuration for front end browser client app.
const clientDebugConfig = merge([
  commonClientConfig,
  {
    name: 'clientDebugConfig',
    entry: [
      // Activate HMR for React.
      'react-hot-loader/patch',

      // Entry point for our app.
      PATHS.app,
    ],
    devtool: 'eval-source-map',
    output: {
      // The output path for the bundle (and other files).
      path: PATHS.build,

      // The output bundle's file name.
      filename: 'bundle.js',
      sourceMapFilename: '[file].map',

      // Tell HMR where to load the hot update chunks; hide the sub-directory "build" from users.
      publicPath: `http://localhost:${APP_SERVER_PORT}/`,
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),

      // Print more readable module names in the browser console on HMR updates.
      new webpack.NamedModulesPlugin(),
    ],
  },
]);

module.exports = clientDebugConfig;
