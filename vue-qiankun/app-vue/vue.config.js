const { name } = require('./package.json');
module.exports = {
  lintOnSave: false,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成umd库格式
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
};
