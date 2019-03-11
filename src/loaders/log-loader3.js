// source 就是接收到的源文件的内容
const loaderUtils = require('loader-utils');
module.exports = function (source) {
    let options = loaderUtils.getOptions(this);
    let name = options.name;
    console.log(typeof source,Buffer.isBuffer(source));
    let cb = this.async();
    console.log(name,'我正在用loader3处理一个JS文件');
    console.log('source', source);
    // return source;
    // 如果你想要返回多个值，就不能return返回了，要使用callback
    // this.callback(null, source + ';//loader3');

    setTimeout(()=>{
        cb(null, source);
    }, 3000);
}
module.exports.raw = true;
