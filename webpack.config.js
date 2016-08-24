/* eslint-disable */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const DEBUG = process.env.NODE_ENV !== 'production';

let plugins = [
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

    // OccurrenceOrderPlugin is needed for long-term caching to work properly.
    // See http://mxs.is/googmv
    new webpack.optimize.OccurrenceOrderPlugin(true),

    // Merge all duplicate modules
    new webpack.optimize.DedupePlugin(),

    // Minify and optimize the JavaScript
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // ...but do not show warnings in the console (there is a lot of them)
        screw_ie8: true, // drop IE 6-8 specific optimizations
      }
    }),

    new ManifestPlugin({fileName: 'assets.json'}),

    // Extract the CSS into a separate file
    new ExtractTextPlugin('[name].[contenthash].css')
  );
} else {
  plugins.push(
    new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    })
  );
}

var entry = [
  'babel-polyfill',
  './src/index.js',
  'draft-js/dist/Draft.css',
  'ndla-styleguide/assets/style.css',
  'ndla-styleguide/assets/favicon.ico',
  'ndla-styleguide/assets/symbol-defs.svg'
];

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
    publicPath: '/assets/',
    filename: DEBUG ? '[name].js' : '[name].[chunkhash].js',
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
        test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
        loader: DEBUG ? 'file-loader?name=[name].[ext]' : 'file-loader?name=[name]-[hash].[ext]'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?root=../"),
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
