/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

const entry = [
  'babel-polyfill',
  './src/index.js',
  'draft-js/dist/Draft.css',
  './style/index.css',
  './style/assets/favicon.ico',
  './style/assets/symbol-defs.svg',
  './style/assets/learningpath.jpg',
  './style/assets/placeholder.png',
];

module.exports = options => ({
  entry: options.entry.concat(entry),

  output: Object.assign({ // Compile into htdocs/assets
    path: path.resolve(process.cwd(), 'htdocs/assets'),
    publicPath: '/assets/',
  }, options.output), // Merge with env dependent settings

  module: {
    rules: options.rules.concat([
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
        test: /.json$/,
        use: {
          loader: 'json-loader',
        },
      },
    ]),
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
      '.css',
    ],
  },

  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
});
