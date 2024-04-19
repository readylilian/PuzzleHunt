const path = require('path');

module.exports = {
  entry: 
  {
    one:    './src/one.js',
    two:    './src/two.js',
    three:  './src/three.js',
    four:   './src/four.js',
    five:   './src/five.js',
    six:    './src/six.js',
    seven:  './src/seven.js',
    meta:   './src/meta.js',
    index:  './src/index.js'

  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/src'),
  },
};