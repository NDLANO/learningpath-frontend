/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const entry = [
  'babel-polyfill',
  './src/index.js',
  'draft-js/dist/Draft.css',
  'ndla-learningpath-styleguide/assets/style.css',
  'ndla-learningpath-styleguide/assets/favicon.ico',
  'ndla-learningpath-styleguide/assets/symbol-defs.svg',
  'ndla-learningpath-styleguide/assets/learningpath.jpg',
];

module.exports = options => ({
  entry: options.entry.concat(entry),

  output: Object.assign({ // Compile into htdocs/assets
    path: path.resolve(process.cwd(), 'htdocs/assets'),
    publicPath: '/assets/',
  }, options.output), // Merge with env dependent settings

  module: {
    rules: [
      {
        test: /\.jsx?|\.js?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: [/node_modules/], // See .babelrc
        loaders: 'babel-loader',
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
        use: [
          {
            // Load files without hash in development
            loader: options.fileLoader,
          },
        ],
      },
      {
        // Extract css to seprate file. Run css url's trough file loader for hashing in prod build
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?root=../',
        }),
      },
      {
        test: /.json$/,
        use: {
          loader: 'json-loader',
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    // Show Webpack progress
    new webpack.ProgressPlugin(),
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      __CLIENT__: true,
      __SERVER__: false,
    }),
    new webpack.NamedModulesPlugin(),
  ]),

  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: [
      '.js',
      '.json',
      '.jsx',
    ],
  },

  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
});
