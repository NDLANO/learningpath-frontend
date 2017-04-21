/**
 * PRODUCTION WEBPACK CONFIGURATION
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');


module.exports = require('./webpack.config.base')({
  // In production, we skip all hot-reloading stuff
  entry: [],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[file].map',
  },

  // Use hashes in prod to anbale caching
  fileLoader: 'file-loader?name=[name]-[hash].[ext]',

  plugins: [

    // Minify and optimize the JavaScript
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // ...but do not show warnings in the console (there is a lot of them)
        screw_ie8: true, // drop IE 6-8 specific optimizations
      },
    }),

    new ManifestPlugin({ fileName: 'assets.json' }),

    // Extract the CSS into a separate file
    new ExtractTextPlugin({ filename: '[name].[contenthash].css', allChunks: false }),
  ],

  devtool: 'source-map',
});
