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
            {
                test: /\.js$/,
                loader: {
                    loader: 'banner-loader',
                    options: {
                        filename: path.resolve(__dirname,'banner.js'),
                        text: '/**珠峰培训**/'
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    // plugins: [
    //     new webpack.BannerPlugin('/**zfpx**/')
    // ]
};