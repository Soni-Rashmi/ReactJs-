var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var APP_DIR = path.resolve(__dirname, './src');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: APP_DIR,
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('/styles/style.css')
    ]
};

module.exports = config;
