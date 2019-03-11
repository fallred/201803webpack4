// source 就是接收到的源文件的内容
module.exports = function (source) {
    console.log('我正在用loader1处理一个JS文件');
    return source;
}