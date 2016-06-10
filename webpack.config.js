/* eslint-disable */
var webpack = require('webpack');

var plugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV'])
];

var DEBUG = process.env.NODE_ENV !== 'production';

if (!DEBUG) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

if (process.env.npm_package_version) {
  plugins.push(new webpack.BannerPlugin(
     process.env.npm_package_name +
     ' ' +
     process.env.npm_package_version
  ));
}

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  target: 'web',
  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  output: {
    path: __dirname + '/htdocs/assets',
    publicPath: '/assets',
    filename: 'app.js'
  },

  devServer: {
    contentBase: './htdocs',
    historyApiFallback: true
  },

  'if-loader': process.env.NODE_ENV || 'development',

  module: {
    loaders: [
      {
        test: /\.jsx?|\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /.json$/,
        loader: 'json'
      }
    ]
  },

  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  }

};
/* eslint-enable */
