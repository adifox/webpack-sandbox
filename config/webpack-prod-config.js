const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = require('./paths');
const common = require('./webpack-common-config');

module.exports = merge(common, {
  entry: {
    vendor: ['react'],
    app: paths.appIndexJs
  },
  mode: 'production',
  output: {
    filename: '[chunkhash]_[name].js',
    path: paths.appBuild,
    publicPath: '/'
  },
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // Extract text/(s)css from a bundle, or bundles, into a separate file.
    new ExtractTextPlugin('styles.css')
  ],
  module: {
    rules: [
      {
        // look for .js or .jsx files
        test: /\.(js|jsx)$/,
        // in the `src` directory
        include: path.resolve(paths.appSrc),
        exclude: /node_modules/,
        use: {
          // use babel for transpiling JavaScript files
          loader: "babel-loader",
          options: {
            presets: ["@babel/react"]
          }
        }
      },
      {
        // look for .css or .scss files.
        test: /\.(css|scss)$/,
        // in the `src` directory
        include: [path.resolve(paths.appSrc)],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                discardDuplicates: true,
                sourceMap: false,
                // This enables local scoped CSS based in CSS Modules spec
                modules: true,
                // generates a unique name for each class (e.g. app__app___2x3cr)
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            }
            // Add additional loaders here. (e.g. sass-loader)
          ]
        })
      }
    ]
  }
})