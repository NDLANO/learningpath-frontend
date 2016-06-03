var webpack = require('webpack');

var plugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV'])
];


if (process.env.NODE_ENV === 'production') {
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
  entry: './src/index.js',
  target: 'web',

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
        loader: 'if!babel-loader?presets[]=react,presets[]=es2015'
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
