const merge = require('webpack-merge');
const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: resolve(__dirname, '..', 'src', 'index.jsx'),
  template: resolve(__dirname, '..', 'src', 'index-template.ejs'),
  src: resolve(__dirname, '..', 'src'),
  staticFrom: resolve(__dirname, '..', 'static'),
  build: resolve(__dirname, '..', 'build'),
  uglifyCache: resolve(__dirname, '..', 'cache/uglify'),
  babelCache: resolve(__dirname, '..', 'cache/babel'),
  staticTo: resolve(__dirname, '..', 'build', 'static'),
};

// Define default configuration values for HtmlWebpackPlugin.
const appConfig = {
  title: 'Home Gallery',
  favicon: '',
  template: PATHS.template,
}

const appTheme = {};

const commonConfig = {
  // This line lets us omit filename extensions.
  resolve: {
    extensions: ['*', '.js', '.jsx', '.less'],
  },
}

const commonNodeConfig = merge([
  commonConfig,
  {
    target: 'node',
    devtool: 'eval-source-map',
    externals: [nodeExternals()],
  },
]);

const commonClientConfig = merge([
  commonConfig,
  {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: PATHS.babelCache,
              },
            },
          ],

          // When transpiling React code in a debug build, scan src/, ignore
          // node_modules and anything else. Note: unit tests & coverage handle their own
          // transpiling, outside webpack.
          include: PATHS.src,
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
        },
        {
          test: /(\.less)$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: `css-loader!less-loader?{modifyVars:${JSON.stringify(appTheme)}}`,
          }),
        },

        // Inline base64 URLs for <=8k images, direct URLs for the rest.
        // Note that PIXI has its own loader.
        {
          test: /\.(gif|png|jpg)$/,
          loader: 'url-loader?name=[path][name].[ext]&limit=8192',
        },

        // Font files, SVG files.
        {
          test: /.*\.(eot|woff|ttf|svg)/,
          loader: 'file-loader?hash=sha512&digest=hex&size=16&name=[hash].[ext]',
        },
      ],
    },

    plugins: [
      // Copy the static image file directory into build tree so it can be served alongside the
      // bundle, for when we access an app image by URL rather than inline.
      new CopyWebpackPlugin([{
        from: PATHS.staticFrom,
        to: PATHS.staticTo,
      }]),

      new ExtractTextPlugin('styles.css'),

      // Generate HTML file from template, insert a reference to the JavaScript bundle.
      new HtmlWebpackPlugin({
        title: appConfig.title,
        favicon: appConfig.favicon,
        template: appConfig.template,
        inject: true,
      }),
    ],

    // Avoid this error when running app via webpack-dev-server:
    // ERROR in ./~/rollbar/lib/parser.js
    // Module not found: Error: Can't resolve 'fs' in '
    // /home/hivolt/git/marlow/node_modules/rollbar/lib'
    node: {
      fs: 'empty',
    },
  },
]);

exports.commonNodeConfig = commonNodeConfig;
exports.commonClientConfig = commonClientConfig;
exports.PATHS = PATHS;
