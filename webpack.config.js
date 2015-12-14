module.exports = {
  entry: './src/index.js',
  target: 'web',

  output: {
    path: __dirname + '/htdocs/assets',
    publicPath: '/assets',
    filename: 'app.js'
  },

  devServer: {
    contentBase: './htdocs'
  },

  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=react,presets[]=es2015'
      }
    ]
  }
};
