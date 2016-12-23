var ExtractTextPlugin = require('extract-text-webpack-plugin');
    webpackUglifyJsPlugin = require('webpack-uglify-js-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    precss = require('precss'),
    autoprefixer = require('autoprefixer'),
    webpack = require("webpack"),
    path = require('path'),
    vars   = require('postcss-simple-vars')


module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css!resolve-url')
        //loader: ExtractTextPlugin.extract('css!resolve-url!postcss')
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['ng-annotate', 'babel-loader?presets[]=es2015']
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=assets/[hash].[ext]" },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=assets/[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass!resolve-url')
        //loader: ExtractTextPlugin.extract('css!sass!resolve-url!postcss')
      }
    ]
  },
  devServer: {
    port:9000,
    inline: true,
    contentBase: "./dist",
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new ExtractTextPlugin('bundle.css', {
      allChunks: true
    })
    // ,
    // new webpackUglifyJsPlugin({
    //   cacheFolder: __dirname + '/dist',
    //   include: /\.js$/,
    //   debug: true,
    //   minimize: true
    // }),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.css$/,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorOptions: { discardComments: {removeAll: true }, discardDuplicates: true,},
    //   canPrint: true
    // })
  ],
   postcss: [autoprefixer, precss],
    devtool: 'source-map'
};
