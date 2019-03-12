const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin= require('html-webpack-plugin');
const fs = require('fs');
let htmls = fs.readdirSync(path.resolve(__dirname, './src/html'));
const htmlPlugins = htmls.map(html=> new HtmlWebpackPlugin({
    template: `./src/html/${html}`,
    filename: html,
    chunks: [html]
}));
module.exports = {
    mode: 'development',
    entry: {
        main1: './src/main1.js',
        main2: './src/main2.js'
    },
    output: {
        filename: '[name].js'
    },
    // 单独配置解析loader路径
    resolveLoader: {
        modules:[
            path.resolve('node_modules'),
            path.resolve('src', 'loaders')
        ]
    },
    resolve: {
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
            // 最左边的loader必须一个脚本，但是这一类型最左边的loader一般不能链式调用
            // 如果最左边的是一个脚本，又希望能链式调用，则用pitch
            {
                test: /\.less$/,
                // 先走style1-loader的pitch方法，不再走less1-loader了
                use: ['style1-loader','less1-loader'],
                // use: ['exact-loader','less1-loader']
                // 放在最左边的loader必须返回一个js脚本，因为这个脚本要拿过来进行AST语法书
                // use: ['less1-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                // loader: 'file1-loader'
                use: {
                    loader: 'url1-loader',
                    options: {
                        limit: 1024,
                        // 不需要转换，或者转换失败，由它来处理
                        fallback: 'file-loader'
                    }
                }
            },
            {
                test: /\.(html|htm)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        layout: path.resolve(__dirname, 'src/loaders/layout.html')
                    }
                }
            }
        ]
    },
    plugins: [
       ...htmlPlugins
    ]
};