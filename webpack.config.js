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
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'if!babel-loader?presets[]=react,presets[]=es2015'
      }
    ]
  }
};
