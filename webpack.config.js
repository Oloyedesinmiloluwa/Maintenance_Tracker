// const webpack = require('webpack');
// const path = require('path');
import path from 'path';

const BUILD_DIR = path.resolve(__dirname, 'react/public');
const APP_DIR = path.resolve(__dirname, 'react');

const config = {
  mode: 'development',
  entry: `${APP_DIR}/index.jsx`,
  output: {
    // path: `${BUILD_DIR}`,
    path: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        // exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ]
  }
};

module.exports = config;
