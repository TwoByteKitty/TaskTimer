const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'sourcemap',
  context: path.resolve(__dirname, './client'),
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
      path: path.resolve(__dirname, './public/')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.ProvidePlugin({
      moment: 'moment'
    })
  ],
  entry: {
    'global.build' : './js/global.js',
    'home-page.build': './js/home-page.js',
    'task-page.build':'./js/task-page.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, './public/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png | jpg | svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'public/assets',
              publicPath: '../assets'
            }
          }
        ]
      }
    ]
  }
};
