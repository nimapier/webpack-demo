
const ConsoleLogOnBuildWebpackPlugin = require('./myPlugin')
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new ConsoleLogOnBuildWebpackPlugin()
  ]
};