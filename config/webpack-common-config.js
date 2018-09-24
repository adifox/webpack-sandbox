const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const paths = require('./paths');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    alias: {
      Components: path.resolve(paths.appSrc, 'components' ),
      Containers: path.resolve(paths.appSrc, 'containers'),
      Utils: path.resolve(paths.appSrc, 'utils')
    }
  },
  module: {
    rules: [
     {
      test: /\.(png|jpg|svg)$/,
      use: ['file-loader']
      }
    ]
  }
}