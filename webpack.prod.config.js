const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');

module.exports = {
  mode: 'production',
  entry: {
    lodash:'./src/lodash.js',
    index: './src/index.js',
    another: './src/another-module.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting',
      // 默认index.html
      // template:''
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 8888, 
      openAnalyzer: false,
      analyzerHost: '',

    }),
    // 只能用于webpack4.0-
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "lodash",
    //   // ( 公共chunk(commnons chunk) 的名称)
    
    //   // filename: "lodash.js",
    //   // ( 公共chunk 的文件名)
    
    //   minChunks: Infinity,
    //   // (模块必须被2个 入口chunk 共享)
    
    //   // chunks: ["index", "another-module"],
    //   // (只使用这些 入口chunk)
    // },

    // webpack4.0+
    // new webpack.optimize.SplitChunksPlugin({
    //   name: "lodash",
    //   chunks: ["index", "another-module"],
    // }),

    // 生产环境应用
    new UglifyJsPlugin({
      sourceMap: true,
      include: /\/src/
    })
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
    }, { // 加载字体文件, 路径为[path][name].ext
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
      include: path.resolve(SRC_PATH, 'common/iconfont'),
      options: {
        name: 'common/iconfont/[name].[ext]',
      },
    }, {
      test: /\.html?$/,
      loader: 'html-loader',
      options: {
        minimize: true,
        removeComments: true,
        collapseWhitespace: true,
      },
    }],
  },

};