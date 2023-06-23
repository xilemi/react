

//  webpack 的打包配置文件  

// 入口文件 入口起点(entry point) 指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始

// 出口文件 output 属性告诉 webpack 在哪里输出它所创建的 bundle

// 环境配置 mode 通过选择 development, production 或 none 之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化

// 开发环境 development
// 测试环境 test
// 生产线上环境  production 

// 入口
// 出口
// mode 打包环境 
// devtool 
// module 模块打包规则定义
// devServer 服务器开发配置
// plugins 插件 

// 修改了这个文件必须重启 
const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')  // 打包HTML
const openBrowserPlugin = require("webpack-open-browser-plugin") // 自动打开浏览器 
const miniCssExtractPluin = require('mini-css-extract-plugin')  // 打包抽离CSS样式 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')  // 打包前清理上一次项目生成的捆绑文件   
const PurifyCssWebpack = require('purifycss-webpack') // 引入PurifyCssWebpack插件
const glob = require('glob') // 引入glob模块,用于扫描全部html文件中所引用的css
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin") // 压缩css代码
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')  // 压缩JS 
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')  // 多个子进程处理压缩 
const TerserPlugin = require('terser-webpack-plugin') // 压缩js代码
const CompressionPlugin = require('compression-webpack-plugin')  // 压缩gzip 
const CopyWebpackPlugin = require('copy-webpack-plugin')  // copy 复制webpack插件

module.exports = {

    entry: "./src/main.js", // 多入口

    output: {  // 出口 
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].[fullhash:8].js",  // [name] 打包的文件名 fullhash:8 生成长度为8的随机字符串 避免文件缓存 
        publicPath: '',// 打包的相对路径 BUG 
    },

    mode: "development",  // 环境定义 

    // 别名
    resolve: {
        alias: {
            "@": path.resolve('./src'),
            "~": path.resolve('./src/utils'),
        }
    },

    devtool: "source-map",  // 方便你在线调试打断点  上线后务必关闭 

    module: {  // 模块打包 
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/i,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {  //打包规则 
                test: /\.css$/i,
                use: [miniCssExtractPluin.loader, 'css-loader']
            },
            {
                test: /\.less$/i,
                use: [miniCssExtractPluin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [miniCssExtractPluin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|woff|eot|woff2|ttf)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // 8M 最大图片 
                            name: 'imgs/[name].[hash:8].[ext]', //404.png=>  404.1234qwew.png 
                        }
                    }
                ]
            }
        ]
    },

    // 服务器
    devServer: {
        compress: true, // 压缩
        hot: true,   // 热更新 
        open: false, // 自动打开浏览器
        host: "0.0.0.0", // 主机 localhost ip 访问 
        port: 7000, // 端口 
        server: 'http',
        headers: {
            token: "WH2302-YYDS"
        },
        proxy: {
            '/api': 'http://localhost:3000',
        },
    },

    // 插件
    plugins: [ // webpack 插件 (性能优化)
        new webpack.ProgressPlugin(),  // 自定义编译过程中的进度报告 
        new webpack.HotModuleReplacementPlugin(), // 热更新热替换 
        new webpack.NoEmitOnErrorsPlugin(),  // 报错但不退出webpack进程 

        new htmlWebpackPlugin({  // 打包HTML到dist 
            template: './public/index.html',
            inject: true, // 自动注入 打包的文件(CSS/JS)
            minify: true, // 文件打包压缩
        }),

        new openBrowserPlugin({   // 没有白屏问题 
            url: "http://127.0.0.1:7000"
        }),

        // 打包抽离CSS
        new miniCssExtractPluin({
            filename: "css/[name].[chunkhash:8].css",
            chunkFilename: "css/[chunkhash:8].[id].css",
        }),

        // new CleanWebpackPlugin(), // 所要清理的文件夹名称

        // new PurifyCssWebpack({
        //     paths: glob.sync(path.join(__dirname, 'dist/*.html')),
        // }),


        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         // 删除注释
        //         output: {
        //             comments: false
        //         },
        //         // 删除console debugger 删除警告 打包上线打开 
        //         compress: {
        //             // drop_console: true, // console
        //             // drop_debugger: false,
        //             // pure_funcs: ['console.log']// 移除console
        //         },
        //         warnings: false,	//	这样写就不报错  
        //     }
        // }),

        // new ParallelUglifyPlugin({
        //     //cacheDir 用于配置缓存存放的目录路径。
        //     cacheDir: '.cache/',
        //     sourceMap: true,
        //     uglifyJS: {
        //         output: {
        //             comments: false,
        //         },
        //         compress: {
        //             // warnings: false,
        //         },
        //     },
        // }),
        new CompressionPlugin({
            // gzip压缩配置
            test: /\.js$|\.html$|\.css/, // 匹配文件名
            threshold: 10240, // 对超过10kb的数据进行压缩
            deleteOriginalAssets: false, // 是否删除原文件
        }),

        new webpack.DefinePlugin({
            DESCRIPTION: 'This Is The Test Text.',
            Token: "WH2302YYDSDAYDAYUP"
        }),

        //提供全局的变量，在模块中使用无需用require引入 自动引入 无需自己引入
        new webpack.ProvidePlugin({
            $: 'jquery',
            React: 'react',
            Component: ['react', 'Component'],
            Vue: 'vue',
            axios: 'axios',
            moment: 'moment'
        }),

        // 复制插件 
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: 'public/js/*.js', 
        //             to: path.resolve(__dirname, 'dist', 'js'),
        //             // flatten: true,
        //         },
        //     ],
        // }),


        // new webpack.IgnorePlugin(/\.\/locale/, /moment/),  // 忽略第三方包指定目录，让这些指定目录不要被打包进去 
    ],

    // 优化
    optimization: {
        minimizer: [
            // 压缩css
            // new OptimizeCSSAssetsPlugin({}),

            new TerserPlugin({  // 4.0
                parallel: 4, // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
                // cache: true, // 是否缓存
                // sourceMap: false,
            }),
        ],
    }
}