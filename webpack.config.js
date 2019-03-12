const path = require('path');
const webpack = require('webpack');
const DonePugin = require('./src/plugins/DonePlugin');
const Done2Pugin = require('./src/plugins/Done2Plugin');
const Done3Pugin = require('./src/plugins/Done3Plugin');
const OptimizePlugin = require('./src/plugins/OptimizePlugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {},
    plugins: [
        new DonePugin(),
        new Done2Pugin(),
        new Done3Pugin(),
    ]
};