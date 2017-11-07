const merge = require('webpack-merge');
const { commonNodeConfig } = require('./webpack.common.js');

// Configuration for mocha-webpack in Node.js environment (server side only).
const testConfig = merge([
  commonNodeConfig,
  {
    name: 'nodeTestConfig',
  },
]);

module.exports = testConfig;
