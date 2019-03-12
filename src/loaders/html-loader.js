let {getOptions} = require('loader-utils');
const fs = require('fs');
function loader(source) {
    // 把loader变成异步函数
    let cb = this.async();
    let { layout } = getOptions(this);
    fs.readFile(layout, 'utf8', (err, data)=>{
        source = data.replace('{{_content_}}', source);
        cb(err, `module.exports = ${JSON.stringify(source)}`);
    });
}
module.exports = loader;