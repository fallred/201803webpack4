// 创建一个style标签，然后把css内容放到里面，然后把这个style标签插入到header中，
let loader = function(source){
    let style = `
        var style = document.createElement("style");
        style.innerHTML = ${JSON.stringify(source)}
        document.head.appendChild(style)
    `;
    // return `module.exports = ${JSON.stringify(style)}`;
    return style;
}
let loaderUtils = require('loader-utils');
// pitch request就是你要加载的文件路径 // index.less
// pitch里的参数可不是文件内容，而是文件的请求路径
loader.pitch = function (request) {
    console.log(request);
    // let modulePath = loaderUtils.stringifyRequest(this, '!!' + request);
    // let script = require(modulePath);
    let style = `
    var style = document.createElement("style");
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + request)})
    document.head.appendChild(style)
    `;
    // 如果return了则后面的loader不再执行
    return style;
}
module.exports = loader;