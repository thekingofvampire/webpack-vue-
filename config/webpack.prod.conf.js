// 首先声明当前是生成环境
process.env.NODE_ENV = 'production'
const path = require('path')
// 引入了上面构思的配置项的配置文件
const config = require('../config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require("../webpack.config.js")
// 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
    devtool: '#source-map',
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: "static/js/[name].[chunkhash].js",
        chunkFilename: "static/js/[id].[chunkhash].js",
        publicPath: config.assetsPublicPath || '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    ]
})
if (config.uglifyJs) {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: true
        }),
    ])
}
if (config.sourceMap) {
    module.exports.devtool = false
}
module.exports = webpackConfig