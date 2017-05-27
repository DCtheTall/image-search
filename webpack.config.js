const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: `${__dirname}/src/index.jsx`,
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        include: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-2'],
        },
      }
    ],
  },
  plugins: [ new UglifyJSPlugin() ],
};
