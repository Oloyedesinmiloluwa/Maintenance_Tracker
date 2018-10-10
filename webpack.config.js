const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'client');
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: `${APP_DIR}/public/index.html`,
});
const config = {
  mode: 'production',
  entry: `${APP_DIR}/index.jsx`,
  output: {
    publicPath: '/',
    path: `${BUILD_DIR}`,
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
  },
  plugins: [htmlWebpackPlugin]
};

module.exports = config;
