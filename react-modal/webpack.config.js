const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, options: { sourceMap: true } },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, options: { sourceMap: true } },
      { test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      { test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins:  [
    new ExtractTextPlugin({filename: './style.css'}),
    new HtmlWebpackPlugin({filename: 'index.html', template: './src/index.html'}),
    new CleanWebpackPlugin(['dist'])
  ]
};
