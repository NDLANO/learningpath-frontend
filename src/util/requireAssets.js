import config from '../config';

const requireAssets = config.isProduction ? require('../../htdocs/assets/assets') : require('../../server/developmentAssets');

export default requireAssets;
