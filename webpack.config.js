const path = require('path')
// 生成html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 如果不提取css样式，所有的.css文件和vue内的style都会以style标签的形式被添加到页面的head里面，不利于资源的缓存而且降低了页面的加载速度。
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// 引入的css
const ExtractRootCss = new ExtractTextPlugin('static/css/root.css');
// vue文件内的style样式
const ExtractVueCss = new ExtractTextPlugin('static/css/style.css');
// 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 拷贝静态文件夹static下的内容
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 引入config
// const config = require("./config");

module.exports = {
    // 入口文件
    entry: {
        app: './src/main.js',
    },
    // 出口文件
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "js/[name].js",
        // publicPath: './'
    },
    // 服务环境
    devServer: {
        contentBase: "./dist"
    },
    // 规则
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractRootCss.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpe?j|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/img/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.less$/,
                use: ExtractRootCss.extract({
                    fallback: 'style-loader',
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // 解析vue文件里面的样式放到一个css里面 不放到style里面
                        'css': ExtractVueCss.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                        }),
                        // 解析vue文件里面的样式放到一个less里面 不放到style里面
                        'less': ExtractVueCss.extract({
                            use: [
                                'css-loader',
                                'less-loader'
                            ],
                            fallback: 'vue-style-loader'
                        })
                    },
                }
            },
        ]
    },
    plugins: [
        // html模板
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        // 引入的css样式
        ExtractRootCss,
        // vue文件里面写的css样式
        ExtractVueCss,
        // 热更新插件
        new webpack.HotModuleReplacementPlugin(),

        // 拷贝static里面的所有内容
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, './static'),
        //         // to: 'static',
        //         to: config.assetsSubDirectory
        //         //   ignore: ['.*']
        //     }
        // ])
    ],
    resolve: {
        // import的时候忽略后缀名
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',// 'vue/dist/vue.common.js' for webpack 1
            '@': path.resolve(__dirname, './src'),
        }
    },
    // 扩展插件  比如cdn引入的
    externals: {
        'jquery': 'window.jQuery'
    },
    // 源码映射
    devtool: '#eval-source-map',
    // 打包 
    //抽取从node_modules引入的模块，如vue
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
}
/**
 * 生成生产代码的时候才触发
 * 1.压缩应用代码；
 * 2.使用 Vue.js 指南中描述的部署方式去除 Vue.js 中的警告。
 * 3.抽取公共模块到vender.js
 */

//  判断是生产模式 还是 开发模式
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 打包时候js压缩
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

    ])
}