// source 就是接收到的源文件的内容
module.exports = function (source) {
    console.log('我正在用loader2处理一个JS文件');
    // return source;
    // 如果你想要返回多个值，就不能return返回了，要使用callback
    this.callback(null, source + ';//loader2');
}