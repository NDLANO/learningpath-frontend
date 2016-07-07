/* eslint-disable */
var webpack = require('webpack');

var DEBUG = process.env.NODE_ENV !== 'production';

var plugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV']),
];

if (!DEBUG) {
  plugins.push(
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    })
  );
}

var entry = ['babel-polyfill', './src/index.js'];

if (DEBUG) {
  entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&quiet=true');
}

if (process.env.npm_package_version) {
  plugins.push(new webpack.BannerPlugin(
     process.env.npm_package_name +
     ' ' +
     process.env.npm_package_version
  ));
}

module.exports = {
  entry: entry,
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
