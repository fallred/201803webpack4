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
            // 最左边的loader必须一个脚本，但是这一类型最左边的loader一般不能链式调用
            // 如果最左边的是一个脚本，又希望能链式调用，则用pitch
            {
                test: /\.less$/,
                // 先走style1-loader的pitch方法，不再走less1-loader了
                // use: ['style1-loader','less1-loader'],
                // use: ['exact-loader','less1-loader']
                // 放在最左边的loader必须返回一个js脚本，因为这个脚本要拿过来进行AST语法书
                // use: ['less1-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                // loader: 'file1-loader'
                use: {
                    loader: 'file1-loader',
                    options: {
                        // webpack自带属性，将文件拷贝到输出目录
                        // outputPath: 'image/[hash]',
                        patten: 'image/[hash]'
                    }
                }
            }
        ]
    },
    // plugins: [
    //     new webpack.BannerPlugin('/**zfpx**/')
    // ]
};