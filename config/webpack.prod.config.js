

// 加载配置文件
var config = require('./webpack.config')


// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

config.mode = 'production';

config.plugins.push(

  new BundleAnalyzerPlugin({
    analyzerPort: 8888,
    openAnalyzer: false,
    analyzerHost: '',

  }),
)


module.exports = config;