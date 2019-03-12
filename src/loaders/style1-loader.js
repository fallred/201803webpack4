// 创建一个style标签，然后把css内容放到里面，然后把这个style标签插入到header中，
let loader = function(source){
    let style = `
        var style = document.createElement("style");
        style.innerHTML = ${JSON.stringify(source)}
        document.head.appendChild(style)
    `;
    return `module.exports = ${JSON.stringify(style)}`;
}
module.exports = loader;