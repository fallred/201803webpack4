const {getOptions, interpolateName} = require('loader-utils');
const mime= require('mime');
function loader(content) {
    let {patten} = getOptions(this);
    // 生成文件名
    let filename = interpolateName(this, patten || '[hash]', {
        content
    });// image/md5
    let ext = mime.getType(this.resourcePath); // image/jpg
    filename = filename +"."+ ext.slice(ext.lastIndexOf('/')+1);
    // 发射文件,向输出目录里保存一个文件
    this.emitFile(filename, content);
    // 导出文件
    return `module.exports=${JSON.stringify(filename)}`;
}
loader.raw=true;
module.exports = loader;