/*
* 插件要尽可能简单，独立
*/
let less = require('less');
let loader = function (source) {
    let callback = this.async();
    less.render(source, (err, output) => {
        // callback(err, output.css);
        // 返回的是一个脚本就不能给别人用，只能放在最左边
        callback(err, `module.exports=${JSON.stringify(output)}`);
    });
}

module.exports = loader;
/**
 * 分割css代码
 * link href
 * 有些时间我们希望less-loader可以放在use数组最左边，最左边要求返回一个js脚本
 */

