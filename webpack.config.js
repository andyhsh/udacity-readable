// native package from node https://nodejs.org/api/path.html
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
  BUILD: path.resolve(__dirname, 'build'),
  SRC: path.resolve(__dirname, 'src'),
}

const config = {
  entry: path.join(paths.SRC, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: paths.BUILD
  },

  // Begin loaders configuration
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({ // extract css into its own file
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          fallback: 'style-loader' // fallback for any CSS not extracted
        })
      }
    ]
  },
  // End loaders

  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // enable importing of JS files without specifying extension
    alias: {
      images: path.join(paths.SRC, 'assets/images')
    }
  },
  devtool: 'eval-source-map'
}

module.exports = config