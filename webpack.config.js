var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack");
var path = require('path');

module.exports = {
  output: {
    sourceMapFilename: "[file].map"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      }
      // ,
      // {
      //     test: /\.scss$/,
      //     loader: ExtractTextPlugin.extract('css!sass')
      // }
    ]
  }
  // ,
  // sassLoader: {
  //     includePaths: [path.resolve(__dirname, "./src/app")]
  // }
  ,
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new ExtractTextPlugin('style/bundle.css', {
      allChunks: true
    })
  ]
};
