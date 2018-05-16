module.exports = {
    defaultTitle: "webpack-vue",//页面的默认title
    externals: {//大三方外部引入库声明
        'jquery': 'window.jQuery'
    },
    cssLoader: 'less',//记得预先安装对应loader
    // cssLoader : 'less!sass',//可以用!号添加多个css预加载器
    usePostCSS: true, //需要提前安装postcss-loader
    toExtractCss: true,

    assetsPublicPath: './',//资源前缀、可以写cdn地址
    assetsSubDirectory: 'static',//创建的的静态资源目录地址

    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,//调试开启时是否自动打开浏览器

    uglifyJs: true,//是否丑化js
    sourceMap: true,//是否开启资源映射
    plugins: []//额外插件
}