module.exports = {
    plugins: {
        //...
        'autoprefixer': {
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ]
        },
        'postcss-pxtorem': {   // px=rem 
            rootValue: 50, // antd-mobile 的官方根字体大小是37.5 (你切图的设计稿宽度 也是 375 )
            propList: ['*'],
            exclude: /node_modules/i, // 排除 node_modules 文件(node_modules 内文件禁止转换)
            selectorBlackList: ["css-"]
        }
    }
}