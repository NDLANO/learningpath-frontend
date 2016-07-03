/* eslint-disable */
var webpack = require('webpack');

var DEBUG = process.env.NODE_ENV !== 'production';

var plugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV']),
];

if (!DEBUG) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
  plugins.push(
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    })
  );
} else {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      __CLIENT__: true,
      __SERVER__: false,
    })
  );
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
