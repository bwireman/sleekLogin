const path = require('path');
const polyfill = require('babel-polyfill');

const sourcePath = path.join(__dirname, './js');

module.exports = {
  entry: ['babel-polyfill', path.resolve(sourcePath,  'main.jsx')],
  output: {
    path: path.join(__dirname, '/static/js/'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        // Test for js or jsx files
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          // Convert ES6 syntax to ES5 for browser compatibility
          presets: ['env', 'react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
