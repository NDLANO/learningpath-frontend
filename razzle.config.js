
const { modifyRule } = require('razzle-config-utils');

module.exports = {
  modify(config, { target, dev }) {
    const appConfig = config;

    modifyRule(appConfig, { test: /\.css$/ }, rule => {
      rule.use.push({ loader: 'postcss-loader' });
    });

    if (target === 'web') {
      appConfig.output.filename = dev
        ? 'static/js/[name].js'
        : 'static/js/[name].[hash:8].js';
    }

    return appConfig;
  },
};
