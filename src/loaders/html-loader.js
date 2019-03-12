let {getOptions} = require('loader-utils');
const fs = require('fs');
const path = require('path');
function loader(source) {
    // 把loader变成异步函数
    let cb = this.async();
    let { layout } = getOptions(this);
    let reg = /@layout\((.+)\)/;
    let result = source.match(reg);
    if (result) {
        let customLayout = result[1];
        console.log('this.context', this.context); 
        customLayout = path.resolve(this.context, customLayout);
        fs.readFile(customLayout, 'utf8', (err, data)=>{
            source = source.replace(result[0], '');
            source = data.replace('{{_content_}}', source);
            cb(err, `module.exports = ${JSON.stringify(source)}`);
        });
    } else {
        fs.readFile(layout, 'utf8', (err, data)=>{
            source = data.replace('{{_content_}}', source);
            cb(err, `module.exports = ${JSON.stringify(source)}`);
        });
    }
}
module.exports = loader;