const path = require('path');
const webpack = require('webpack');
const DonePugin = require('./src/plugins/DonePlugin');
const Done2Pugin = require('./src/plugins/Done2Plugin');
const Done3Pugin = require('./src/plugins/Done3Plugin');
const OptimizePlugin = require('./src/plugins/OptimizePlugin');
const FileListPlugin = require('./src/plugins/FileListPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlinePlugin = require('./src/plugins/HtmlInlinePlugin');
const UploadPlugin = require('./src/plugins/UploadPlugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
        publicPath: 'http://img.zhufengpeixun.cn'
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        // new HtmlInlinePlugin(),
        new UploadPlugin()
    ]
};