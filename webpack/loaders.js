const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const styleLoader = ExtractTextPlugin.extract('css!stylus');

module.exports = (isProduction) => [
  {
    test: /\.styl$/,
    loader: isProduction ? styleLoader : 'style-loader!css-loader!stylus-loader'
  },
  {
    test: /\.js$/,
    loaders: ['babel'],
    include: path.join(__dirname, '../lib', '../src')
  },
  {
    test: /.*\.(gif|png|jpg|jpeg|svg)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=[hash].[ext]',
      'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
    ]
  }
];
