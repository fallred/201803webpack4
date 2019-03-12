const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    // 单独配置解析loader路径
    resolveLoader: {
        modules:[
            path.resolve('node_modules'),
            path.resolve('src', 'loaders')
        ]
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: [
            //         'log-loader1.js',
            //         'log-loader2.js',
            //         'log-loader3.js'
            //     ],
            //     exclude:/node_modules/
            // },
            {
                test: /\.less$/,
                use: ['style1-loader','less1-loader']
            }
        ]
    },
    // plugins: [
    //     new webpack.BannerPlugin('/**zfpx**/')
    // ]
};