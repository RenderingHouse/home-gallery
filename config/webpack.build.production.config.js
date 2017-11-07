const webpack = require('webpack');
const merge = require('webpack-merge');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

// Satisfy ESLint import/no-dynamic-require rule.
const pkg = require('../package.json');

const { commonClientConfig, PATHS } = require('./webpack.common.js');

const dependencies = Object.keys(pkg.dependencies);

// Configuration for front end browser client app.
const clientProductionConfig = merge([
  commonClientConfig,
  {
    name: 'clientProductionConfig',
    entry: {
      vendor: dependencies,
      // Entry point for our app.
      index: PATHS.app,
    },
    devtool: 'source-map',
    output: {
      // The output path for the bundle (and other files).
      path: PATHS.build,

      // The output bundle's file name.
      filename: '[name].[chunkhash].js',
      // filename: 'bundle.js',
      sourceMapFilename: '[file].map',

      // Hide the sub-directory "build" from users.
      publicPath: '/',
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
      // See:
      // https://github.com/mishoo/UglifyJS2
      // https://github.com/ModusCreateOrg/budgeting-sample-app-webpack2/blob/master/webpack.config.js
      // https://webpack.js.org/guides/production-build/#node-environment-variable
      //
      // Dont' use the -p option when calling webpack; directly control the optimization
      // configuration here instead.
      //
      // new webpack.optimize.UglifyJsPlugin({
      //   sourceMap: true,
      //   compress: {
      //     warnings: true,
      //   },
      // }),
      new ParallelUglifyPlugin({
        cacheDir: PATHS.uglifyCache,
        uglifyJS: {
          sourceMap: true,
          // Disable dropping of unreferenced functions and variables, because it costs us about 20K
          // (out of 2MB) but saves 3 to 4 seconds (out of 56 seconds).
          // See: https://stackoverflow.com/questions/15447727/how-to-speed-up-the-minification-process-of-uglifyjs-2
          compress: {
            unused: false,
          },
        },
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
  },
]);

module.exports = clientProductionConfig;
