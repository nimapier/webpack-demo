const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
const fs = require('fs');
const { Compilation } = require('webpack');

class ConsoleLogOnBuildWebpackPlugin {
  constructor(options) {
    this.fileName = options.name
  }
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compiler) => {
      console.log('webpack 构建正在启动！');
    });
    compiler.hooks.compilation.tap('addjs', (compilation) => {
      compilation.hooks.buildModule.tap('addjs', module => {
        this.addJs(module)
        module.build()
      })
      // compilation.hooks.finishModules.tap('removejs',module => {
      //   this.removeJs(module)
      // })
      // compilation.hooks.processAssets.tap({
      //   name: 'MyPlugin',
      //   stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS, // see below for more stages
      // },assets => {
      //   debugger
      //   console.log(assets);
      // })
    });
  }
  addJs(module) {
    const {path,__innerRequest} = module.resourceResolveData || {}
    if(__innerRequest !== this.fileName) return
    const filePath = path
    try {
      debugger
      fs.readFile(filePath, "utf8", (err,data) => {
        const newData = data + ';console.log(1)'
        fs.writeFile(filePath,newData,function(){})
      })
    } catch (err) {
      console.error(err);
    }
  }
  // 把加上的代码再删掉(TODO)
  removeJs(modules) {
    const target = modules.find(module => {
      const {__innerRequest} = module.resourceResolveData || {}
      return __innerRequest === this.fileName
    })
    if(!target) return
    const filePath = target.resourceResolveData.path
    console.log(filePath)
    try {
      fs.readFile(filePath, "utf8", (err,data) => {
        const newData = data.slice(0,-15)
        fs.writeFile(filePath,newData,function(){})
      })
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;