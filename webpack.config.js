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
                use: [
                    // {
                        // loader: 'babel-loader',
                        // query: {
                        //     preset: ["env", "stage-0", "react"]
                        // }

                        // loader: path.resolve(__dirname, 'src', 'loaders', 'log-loader')
                    // }
                    'log-loader1.js','log-loader2.js'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    }
};