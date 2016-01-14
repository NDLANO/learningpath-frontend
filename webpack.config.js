module.exports = {
  entry: './src/index.js',
  target: 'web',

  output: {
    path: __dirname + '/htdocs/assets',
    publicPath: '/learningpath/assets',
    filename: 'app.js'
  },

  devServer: {
    contentBase: './htdocs',
    historyApiFallback: true,
    proxy: {
      '/auth/*': 'http://localhost:3000'
    }
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
