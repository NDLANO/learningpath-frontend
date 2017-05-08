import config from '../config';

const requireAssets = __CLIENT__ ? window.assets : ( // eslint-disable-line no-nested-ternary
  config.isProduction ? require('../../htdocs/assets/assets') : require('../../server/developmentAssets') // eslint-disable-line import/no-unresolved
);

export default requireAssets;
