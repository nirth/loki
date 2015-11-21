const path = require('path');
const webpack = require('webpack');
const loaders = require('./loaders');
const output = require('./output');
const pckg = require('../package.json');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    javascript: [
      './src/index'
    ]
  },
  output: output('../dist'),
  plugins: [
    new ExtractTextPlugin('app.css', {allChunks: true}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(pckg.version),
      __ENVIRONMENT__: JSON.stringify('production'),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: loaders(true)
  }
};
