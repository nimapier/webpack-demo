
const ConsoleLogOnBuildWebpackPlugin = require('./myPlugin')
const path = require('path');
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    clean: true
  },
  // mode: 'development',
  plugins: [
    // new ConsoleLogOnBuildWebpackPlugin({name: './main.js'})
  ],
  module: {
    rules: [
      {
        test: /\main.js$/,
        use: [
          {
            loader: path.resolve('myLoader.js'),
            options: {}
          }
        ]
      }
    ]
  }
};