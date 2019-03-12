/*
* 插件要尽可能简单，独立
*/
let less = require('less');
let loader = function (source) {
    let callback = this.async();
    less.render(source, (err, output) => {
        callback(err, output.css);
    });
}
module.exports = loader;