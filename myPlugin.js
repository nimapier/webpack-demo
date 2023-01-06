const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
const fs = require('fs')

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('webpack 构建正在启动！');
    });
    compiler.hooks.done.tap('addjs', (stats) => {
      this.addJs(stats)
    });
  }
  addJs(stats) {
    debugger
    const {path, filename} = stats.compilation.options.output
    const filePath = (path +"/" + filename)
    try {
      fs.readFile(filePath, "utf8", (err,data) => {
        const newData = data + '这是加在最后的代码'
        fs.writeFile(filePath,newData,function(){})
      })
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;