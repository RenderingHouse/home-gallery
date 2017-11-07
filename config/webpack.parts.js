// Define re-usable configuration parts in one place. These are composed into individual
// configurations. See example at:
// https://survivejs.com/webpack/developing/composing-configuration/

exports.devServer = ({ host, port, proxyTarget }) => ({
  devServer: {
    host,
    port,

    // Enable HMR on the server.
    hot: true,

    // Fall back to root for other URL's.
    historyApiFallback: true,

    // Leaving "port", "publicPath", and "contentBase" unchanged.

    // Reverse proxy configuration for the backend API server. See:
    // https://webpack.github.io/docs/webpack-dev-server.html
    // https://webpack.js.org/configuration/dev-server/#devserver-proxy
    // http://jlongster.com/Backend-Apps-with-Webpack--Part-I
    proxy: {
      '/api/**': {
        target: proxyTarget,
        // Remove the leading '/api' from the URL before passing it along.
        // See: https://webpack.github.io/docs/webpack-dev-server.html#proxying-local-virtual-hosts
        pathRewrite: { '^/api': '' },
        // changeOrigin is needed when proxying a local virtual hosts.
        // See: https://webpack.github.io/docs/webpack-dev-server.html#proxying-local-virtual-hosts
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
