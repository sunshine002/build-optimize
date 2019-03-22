
const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');

// 压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        // verdon:['react', 'react-dom'],
        commons: ['lodash'],
        index: './src/index.js',
        another: './src/another-module.js',
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: "[name].chunk.js"
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Code Splitting',
            // 默认index.html
            template: './index.html',
            parallel: true,
            // chunks:['commons', 'verdon']
        }),

        // 压缩
        new UglifyJsPlugin({
            sourceMap: true,
            include: /\/src/
        }),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),

        // webpack4.0+
        // new webpack.optimize.SplitChunksPlugin({
        //     chunks: "async",
        //     minSize: 30000,
        //     minChunks: 1,
        //     maxAsyncRequests: 5,
        //     maxInitialRequests: 3,
        //     automaticNameDelimiter: '~',
        //     name: true,
        //     cacheGroups: {
        //         // 自定义缓存组
        //         commons: {
        //             // chunks 规定哪部分代码需要分割
        //             chunks: "all",
        //             // minChunks 当文件出现的次数大于2时，才将该文件视为依赖文件
        //             minChunks: 2,
        //             // name 分割出来的文件名，若不指定name，以缓存组的名字作为分割出来的文件名，name作用于chunkFilename
        //             name: 'lodash',
        //             // minSize 当文件的大小大于该值时，才执行该缓存组(单位为kb)
        //             // minSize: 1,
        //             // priority 规定打包的优先级(数值越大优先级越高)
        //             priority: 0,
        //         },
        //         vendors: {
        //             test: /[\\/]node_modules[\\/]/,
        //             priority: -10
        //         },
        //         default: {
        //             minChunks: 2,
        //             priority: -20,
        //             reuseExistingChunk: true
        //         }
        //     }
        // }),
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader?cacheDirectory',
            exclude: [
                path.resolve(ROOT_PATH, 'node_modules'),
            ],
        }, { // css loader
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader'],
            }),
            exclude: [
                path.resolve(SRC_PATH, 'sys'),
            ],
        }, { // less loader
            test: /\.less$/,
            exclude: [
                path.resolve(SRC_PATH, 'sys'),
            ],
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', {
                    loader: 'less-loader',
                }],
            }),

        }, { // 业务样式, css module
            test: /\.less$/,
            exclude: [
                path.resolve(ROOT_PATH, 'node_modules'),
                path.resolve(SRC_PATH, 'common'),
            ],
            // 业务代码样式随模块异步加载, 无需ExtractTextPlugin
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[local]_[hash:base64:8]',
                },
            }, 'postcss-loader', 'less-loader'],
        }, { // 加载图片
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            exclude: path.resolve(SRC_PATH, 'common/iconfont'),
            options: {
                limit: 8192,
                name: 'img/[name].[hash:base64:8].[ext]',
            },
        }],
    },

};