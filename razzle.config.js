const { modifyRule } = require('razzle-config-utils');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  plugins: [],
  modifyWebpackConfig({ env: { target, dev }, webpackConfig: appConfig }) {
    // Razzle/CRA breaks the build on webpack warnings. Disable CI env to circumvent the check.
    process.env.CI = 'false';

    const addEntry = options => {
      if (target === 'web') {
        if (dev) {
          appConfig.entry[options.name] = [
            appConfig.entry.client[0], // hot reloading
            options.entry,
          ];
        } else {
          appConfig.entry[options.name] = [options.entry];
        }
      }
    };

    modifyRule(appConfig, { test: /\.css$/ }, rule => {
      rule.use.push({ loader: 'postcss-loader' });
    });

    addEntry({ entry: './src/polyfill', name: 'polyfill' });

    if (target === 'web') {
      appConfig.output.filename = dev
        ? 'static/js/[name].js'
        : 'static/js/[name].[hash:8].js';

      if (!dev) {
        appConfig.optimization.concatenateModules = true;
      } else {
        appConfig.entry.injectCss = ['./src/style/index.css'];
      }
      appConfig.performance = {
        hints: false,
      };
    }

    if (target === 'node' && !dev) {
      // This change bundles node_modules into server.js. The result is smaller Docker images.
      // It triggers a couple of «Critical dependency: the request of a dependency is an
      // expression warning» which we can safely ignore.
      appConfig.externals = [];
    }

    if (!dev) {
      appConfig.devtool = 'source-map';
    } else {
      appConfig.devtool = 'cheap-module-source-map';
    }

    return appConfig;
  },
};
