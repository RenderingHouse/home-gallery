const merge = require('webpack-merge');
const webpack = require('webpack');

const parts = require('./webpack.parts.js');
const { commonClientConfig, PATHS } = require('./webpack.common.js');

const APP_SERVER_PORT = process.env.PORT || 3000;

const API_SERVER = process.env.API_SERVER || 'http://localhost';
const API_SERVER_PORT = process.env.API_SERVER_PORT || 5001;
const API_SERVER_URL = `${API_SERVER}:${API_SERVER_PORT}`;

// Configuration for webpack-dev-server and Hot Module Reloading.
const devServerConfig = merge([
  commonClientConfig,
  {
    name: 'devServerConfig',
    entry: [
      // Activate HMR for React.
      'react-hot-loader/patch',

      // Bundle the client for webpack-dev-server, and connect to the provided endpoint.
      `webpack-dev-server/client?http://localhost:${APP_SERVER_PORT}/`,

      // Bundle the client for hot reloading. "only-" means to only hot reload for successful
      // updates.
      'webpack/hot/only-dev-server',

      // Path of entry point for our app.
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
  parts.devServer({
    host: 'localhost',
    port: APP_SERVER_PORT,
    proxyTarget: `${API_SERVER_URL}`,
  }),
]);

module.exports = devServerConfig;
