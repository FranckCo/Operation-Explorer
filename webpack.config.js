var TransferWebpackPlugin = require('transfer-webpack-plugin');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080/', //inline mode for webpack-dev-server
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/js/main.js'
  ],
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              autoprefixer: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('precss'),
                  require('autoprefixer')({ browsers: ['> 5%'] })
                ];
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread', 'import-asserts']
        }
      }
    ]
  },
  plugins: [
    new TransferWebpackPlugin(
      [{ from: 'img', to: 'img' }],
      path.join(__dirname, 'src')
    )
  ],
  //`jison` module pattern adds `require('fs')`, which throws an error
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: './js/operation-explorer.js'
  }
};
