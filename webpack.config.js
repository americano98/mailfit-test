const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
}


module.exports = {
  context: PATHS.src,
  entry: {
    app: `${PATHS.src}\\js\\app.js`
  },
  output: {
    filename: 'js/[name].js',
    path: PATHS.dist,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
   new HtmlWebpackPlugin({
      hash: false,
      template:  `${PATHS.src}\\index.html`,
      filename: './index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}\\images`, to: "images" },
        { from: `${PATHS.src}\\fonts`, to: "fonts" },
      ],
    })
  ],

  devtool: 'source-map',

  devServer: {
    contentBase: './dist'
  },
  performance: {
    hints: false
  }

}