const loaderUtils= require('loader-utils');
const validateOptions = require('schema-utils');
const fs = require('fs');
function loader(source){
    let cb = this.async();
    // loader是异步的，任务完成后需要手动执行callback
    this.cacheable && this.cacheable();//启用loader缓存
    // 验证options合法性
    let schema = {
        type: 'object',
        properties: {
            filename: {
                type: 'string'
            },
            text: {
                type: 'string'
            }
        }
    };
    // 通过工具方法获取options
    let options = loaderUtils.getOptions(this);
    validateOptions(schema,options,'Banner-Loader');
    let { text, filename } = options;
    if (text) {
        cb(null, text+source);
    } else if (filename) {
        fs.readFile(filename,'utf8',(err,text)=>{
            cb(err, text+source);
        });
    }
}
module.exports = loader;