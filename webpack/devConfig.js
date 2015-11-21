const path = require('path');
const webpack = require('webpack');
const loaders = require('./loaders');
const output = require('./output');
const pckg = require('../package.json');

module.exports = {
  devtool: 'eval',
  entry: {
    javascript: [
      'webpack-hot-middleware/client',
      './src/index'
    ]
  },
  output: output('dist'),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(pckg.version),
      __ENVIRONMENT__: JSON.stringify('development')
    })
  ],
  module: {
    loaders: loaders(false)
  }
};
