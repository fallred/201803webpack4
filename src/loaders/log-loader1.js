// source 就是接收到的源文件的内容
module.exports = function (source) {
    let cb = this.async();
    console.log('我正在用loader1处理一个JS文件');
    console.log('source', source);
    // return source + ';//loader1';
    setTimeout(()=>{
        // this.callback(null, source);
        cb(null, source);
    }, 3000);
}