
// 加载配置文件
var config = require('./webpack.config')

// 只存在于开发环境中
config.devtool = 'cheap-module-source-map';

config.mode = 'development';

config.devServer={
    historyApiFallback: true,
}

config.plugins.push()

module.exports = config