const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const extractStyles = new ExtractTextPlugin('styles.css');


let config = {
  entry: "./src/app/index.js",
  output: {
    path: path.resolve(__dirname, './public'),
    filename: "app.js"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.sass', '.css', '.jpeg', '.jpg', '.gif', 'png'],
    alias: {
      images: path.resolve(__dirname, 'src/app/assets/images'),
      stylesheets: path.resolve(__dirname, 'src/app/assets/stylesheets'),
      components: path.resolve(__dirname, 'src/app/components'),
      pages: path.resolve(__dirname, 'src/app/components/pages'),
      spotify: path.resolve(__dirname, 'src/app/helpers/spotify.js'),
      reducers: path.resolve(__dirname, 'src/app/store/reducers'),
      actions: path.resolve(__dirname, 'src/app/store/actions')
    }
  },
  module:{
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|sass)$/,
        use: ['css-hot-loader'].concat(extractStyles.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: ['style-loader']
        }))
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/app/assets/images/&name=images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          }
        }],
        exclude: /node_modules/,
        include: __dirname,
      }
    ]
  },
  plugins: [
    extractStyles
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    inline: true,
    open: true
  },
  devtool: 'eval-source-map'
}

module.exports = config;

if(process.env.NODE_ENV === 'production'){
  module.exports.plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new OptimizeCSSAssets()
  )
}
