const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// native package from node https://nodejs.org/api/path.html
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  BUILD: path.resolve(__dirname, 'build'),
  SRC: path.resolve(__dirname, 'src'),
};

const config = {
  entry: path.join(paths.SRC, 'index.jsx'),
  output: {
    filename: 'bundle.js',
    path: paths.BUILD,
  },

  // Begin loaders configuration
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          // extract css into its own file
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          fallback: 'style-loader', // fallback for any CSS not extracted
        }),
      },
    ],
  },
  // End loaders

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin('style.css'),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // enable importing of JS files without specifying extension
    alias: {
      images: path.join(paths.SRC, 'assets/images'),
    },
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: paths.BUILD,
    historyApiFallback: true,
  },
};

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  // if we're in production mode, here's what happens next
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin()); // call the uglify plugin
}
