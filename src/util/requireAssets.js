import config from '../config';

const clientAssets = window.config.isProduction ? require('../../htdocs/assets/assets') : require('../../server/developmentAssets');
const serverAssets = config.isProduction ? require('../../htdocs/assets/assets') : require('../../server/developmentAssets');

const requireAssets = window ? clientAssets : serverAssets;

export default requireAssets;
