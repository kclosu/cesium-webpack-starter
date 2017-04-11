const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
    publicPath: "/",
    sourcePrefix: ''
  },
  plugins: [
    new HtmlPlugin({
      template: 'index.html',
      inject : true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        context: './node_modules/cesium/Source/',
        from: '**/*.+(png|svg|jpg|css)',
        to: path.join(__dirname, "../dist/assets/cesium")
      }, {
        context: './node_modules/cesium/Source/',
        from: 'Assets/**',
        to: path.join(__dirname, "../dist/assets/cesium")
      }
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    hot: true,
    compress: true,
    publicPath: "/",
    host: "0.0.0.0"
  },
  module: {
    unknownContextRegExp: /^.*$/,
    unknownContextCritical: false,
    wrappedContextCritical: true,
    exprContextRegExp: /$^/,
    exprContextCritical: false,
    rules: [{
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader"
      ]
    }, {
      test: /\.(png|gif|jpg|jpeg)$/,
      use: ['file-loader']
    }, {
      test: /\.glsl$/,
      use: ['webpack-glsl-loader']
    }]
  },
  resolve: {
    extensions: ['.js', '.glsl']
  }
};
